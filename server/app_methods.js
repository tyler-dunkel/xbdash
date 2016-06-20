Future = Npm.require('fibers/future');

Meteor.methods({
	getTweets: function(screenName) {
		var fut = new Future();
		var T = new Twit({
			consumer_key: Meteor.settings.services.twitterConsumerKey,
			consumer_secret: Meteor.settings.services.twitterConsumerSecret,
			access_token: Meteor.settings.services.twitterAccessToken,
			access_token_secret: Meteor.settings.services.twitterAccessTokenSecret
		});

		T.get('statuses/user_timeline', { screen_name: screenName, count: 3 }, function(err, data, response) {
			console.log("data: " + data);
			console.log('fire this first');
			fut.return({
				err: err,
				result: data
			});
		});

		// var getTweet = Meteor.wrapAsync(T.get());

		// var tweets = getTweet('statuses/user_timeline', { screen_name: screenName, count: 3 });
		// console.log('logging the tweets');
		// console.log(tweets);

		// var tweetsAsync = Meteor.wrapAsync(
		// 	T.get('statuses/user_timeline', { screen_name: screenName, count: 3 }, function(err, data, response) {
		// 		console.log("data: " + data);
		// 		console.log('fire this first');
		// 	})
		// );

		return fut.wait();
	}
});


// Meteor.methods({
// 	getCommentsWrapAsync: function() {
// 		var convertAsyncToSync = Meteor.wrapAsync( HTTP.get ),
// 		resultOfAsyncToSync = convertAsyncToSync( 'http://jsonplaceholder.typicode.com/comments', {} );
// 		return resultOfAsyncToSync;
// 	}
// });

// Meteor.methods({
//     sendWelcomeEmail: function (userId) {
// 	    var userEmail;
//     	var user = Meteor.users.findOne({ _id: userId });
//         var userAchievementsCount = userAchievements.find({ userId: userId, progressState: true }).count();
//         var userTotalAchievements = userAchievements.find({ userId: userId }).count();
//         var userGamesCount = userGames.find({ userId: userId, completed: true }).count();
//         var userTotalGames = userGames.find({ userId: userId }).count();

//         if (!user) return;

// 		if (user.services) {
// 			if (user.services.facebook) {
// 				userEmail = user.services.facebook.email;
// 			} else if (user.services.twitter) {
// 				userEmail = user.services.twitter.email;
// 			} else {
// 				userEmail = user.emails[0].address;
// 			}
// 		} else {
// 			userEmail = user.emails[0].address;
// 		}

// 		try {
// 			Email.send({
// 			    to: user.username + "<" + user.emails[0].address + ">",
// 			    from: "XBdash <contact@email.xbdash.com>",
// 			    subject: "Welcome to XBdash, " + user.username,
// 			    html: SSR.render( 'welcomeEmail', {
// 					fName: user.username,
// 					aCount: userAchievementsCount,
// 					atCount: userTotalAchievements,
// 					gCount: userGamesCount,
// 					gtCount: userTotalGames
// 				}),
// 				'o:tag': 'alerts',
// 				'o:tracking-clicks': 'yes',
// 				'o:tracking-opens': 'yes'
// 			});
// 		} catch (e) {
// 			logger.info('Error rendering Welcome email.', error);
// 			return;
// 		}
//     }
// });