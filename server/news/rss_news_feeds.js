Meteor.startup(function () {
    (function timer() {
        // Polygon feed
        HTTP.get('http://www.polygon.com/rss/group/news/index.xml', function (err, res) {
            xml2js.parseString(res.content, function (err, result) {
                result.feed.entry.forEach(function (i) {
                    i.slug = i.id[0].replace(/.*\//,'');
                    //insert articles
                    var count = xbdNews.find({ slug: i.slug }).count(); // http://stackoverflow.com/questions/10167604/how-can-i-add-a-two-column-unique-id-to-the-mongodb-in-a-meteor-app
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
                        var articleUrl = 'https://beta.xbdash.com/news/'+i.slug;
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
        // IGN feed
        // HTTP.get('http://feeds.ign.com/IGNXboxOneAll.xml', function (err, res) {
        //     xml2js.parseString(res.content, function (err, result) {
        //         result.feed.entry.forEach(function (i) {
        //             i.id = i.id[0].replace(/.*\//,'');

        //             //insert articles
        //             var count = xbdNews.find({ slug: i.id }).count(); // http://stackoverflow.com/questions/10167604/how-can-i-add-a-two-column-unique-id-to-the-mongodb-in-a-meteor-app
        //             if (count === 0) {
        //                 i.link = i.link[0]['$'];
        //                 i.contentType = i.content[0]['$'];
        //                 i.content = i.content[0]['_'];
        //                 i.title = i.title[0];
        //                 i.author = i.author[0].name[0];
        //                 i.updated = new Date(i.updated[0]);
        //                 i.published = new Date(i.published[0]);
        //                 i.shareCount = 0;
        //                 xbdNews.insert(i);
        //             } else {
        //                 var shareCount;
        //                 var articleUrl = 'http://xboxdash.com/news/'+i.id;
        //                 var url = "https://api.facebook.com/method/links.getStats?urls="+articleUrl+"&format=json";
        //                 HTTP.get(url, function (err, result) {
        //                     if (result.statusCode === 200) {
        //                         var respJson = JSON.parse(result.content);
        //                         shareCount = respJson[0].total_count;
        //                     }
        //                 });
        //                 xbdNews.upsert({ slug: i.id }, { $set: { shareCount: shareCount } });
        //             }
        //         });
        //     });
        // });
        Meteor.setTimeout(timer, 30 * 60 * 1000) // 20 minutes)
    }());
    // http://feeds.ign.com/IGNXboxOneAll
});

// <item>
//       <title>Xbox Boss Explains Why Final Fantasy 14 is Not on Xbox One</title>
//       <link>http://feeds.ign.com/~r/IGNXboxOneAll/~3/6mZhVBr5PyY/xbox-head-discusses-why-final-fantasy-14-is-not-on-xbox-one</link>
//       <description>At the end of the day, it all comes down to business deals.</description>
//       <pubDate>Sat, 19 Sep 2015 00:25:57 GMT</pubDate>
//       <guid isPermaLink="false">55fca55476dc971e7e43e9aa</guid>
//       <content:encoded><![CDATA[<p>Square Enix's reborn MMO Final Fantasy XIV has been available on PlayStation 4 for some time now, but no announcement has been made regarding whether or not it will eventually come to the Xbox One.
// </p><p>Unfortunately, it does not appear the game will be headed to the Microsoft platform any time soon. Speaking with IGN, Xbox head Phil Spencer explained this is due to business and platform exclusivity.
// </p><p>"It's business," he said, adding he couldn't speak too candidly about the matter. "As I've grow in this role, and I've tried to learn the third-party exclusivity thing - and you see us doing less of it now - </p><p> it's not something I'm a huge fan of."
// </p><p>Spencer cites that he likes to bring different aspects of a game to the Xbox One instead of deal with third-party exclusive titles, citing the <a href="http://www.ign.com/articles/2015/06/15/e3-2015-fallout-4-to-support-mods-on-xbox-one" target="_blank">Fallout 4 mods coming to the platform</a> and how Microsoft worked with EA to get EA Access. He notes a <a href="http://www.ign.com/articles/2015/07/28/square-enix-ceo-tomb-raider-exclusivity-wasnt-an-easy-decision" target="_blank">different situation</a> with Rise of the Tomb Raider, however, since Microsoft is playing an active role in its development and publishing.
// </p><p><a href="http://www.ign.com/articles/2015/09/19/xbox-head-discusses-why-final-fantasy-14-is-not-on-xbox-one">Continue reading&hellip;</a></p><img src="http://feeds.feedburner.com/~r/IGNXboxOneAll/~4/6mZhVBr5PyY" height="1" width="1" alt=""/>]]></content:encoded>
//       <dc:creator>Cassidee Moser</dc:creator>
//       <dc:date>2015-09-19T00:25:57Z</dc:date>
//     <feedburner:origLink>
//     http://www.ign.com/articles/2015/09/19/xbox-head-discusses-why-final-fantasy-14-is-not-on-xbox-one</feedburner:origLink>

// </item>