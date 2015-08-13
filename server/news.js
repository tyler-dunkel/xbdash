Meteor.startup(function () {
    (function timer() {
        HTTP.get('http://www.polygon.com/rss/group/news/index.xml', function (err, res) {
            xml2js.parseString(res.content, function (err, result) {
                result.feed.entry.forEach(function (i) {
                    i.id = i.id[0].replace(/.*\//,'');

                    //insert articles
                    var count = xbdNews.find({ id: i.id }).count(); // http://stackoverflow.com/questions/10167604/how-can-i-add-a-two-column-unique-id-to-the-mongodb-in-a-meteor-app
                    if (count === 0) {
                        i.link = i.link[0]['$'];
                        i.contentType = i.content[0]['$'];
                        i.content = i.content[0]['_'];
                        i.title = i.title[0];
                        i.author = i.author[0].name[0];
                        i.updated = new Date(i.updated[0]);
                        i.published = new Date(i.published[0]);
                        i.shareCount = 0;
                        xbdNews.insert(i);
                    } else {
                        var shareCount;
                        var articleUrl = 'http://xboxdash.com/news/'+i.id;
                        var url = "https://api.facebook.com/method/links.getStats?urls="+articleUrl+"&format=json";
                        HTTP.get(url, function (err, result) {
                            if (result.statusCode === 200) {
                                var respJson = JSON.parse(result.content);
                                shareCount = respJson[0].total_count;
                            }
                        });
                        xbdNews.upsert({ id: i.id }, { $set: { shareCount: shareCount } });
                    }
                });
            });
        });
        Meteor.setTimeout(timer, 30 * 60 * 1000) // 20 minutes)
    }());
});