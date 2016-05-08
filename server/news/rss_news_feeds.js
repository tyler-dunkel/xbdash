Meteor.startup(function () {
    (function timer() {
        HTTP.get('http://www.polygon.com/rss/group/news/index.xml', function (err, res) {
            xml2js.parseString(res.content, function (err, result) {
                result.feed.entry.forEach(function (i) {
                    i.slug = i.id[0].replace(/.*\//,'');
                    var count = xbdNews.find({ slug: i.slug }).count();
                    if (count === 0) {
                        i.source = 'polygon';
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
                        var articleUrl = 'https://beta.xbdash.com/news/' + i.slug;
                        var url = "https://api.facebook.com/method/links.getStats?urls=" + articleUrl + "&format=json";
                        HTTP.get(url, function (err, result) {
                            if (result.statusCode === 200) {
                                var respJson = JSON.parse(result.content);
                                shareCount = respJson[0].total_count;
                            }
                        });
                        xbdNews.upsert({ slug: i.slug }, { $set: { shareCount: shareCount } });
                    }
                });
            });
        });
        Meteor.setTimeout(timer, 30 * 60 * 1000) // 20 minutes)
    }());
});