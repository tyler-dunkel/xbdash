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
			fut.return({
				err: err,
				result: data
			});
		});

		return fut.wait();
	},
	notificationRead: function(_id) {
		var readAt = new Date();
		Notifications.update({_id: _id}, {$set: {read: true, readAt: readAt}});
	},
	addToWishlist: function(type, doc) {
		var user = Meteor.user();
		var wishlistCount = userWishlist.find({ userId: user._id}).count();
		if (wishlistCount >= 10) {
			return { status: 'warning', title: 'Wishlist is full!', error: null };
		}
		if (type && type === 'game') {
			if (userWishlist.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', title: 'Oops!', reason: 'Game is already in your wishlist.' };
			}
			userWishlist.insert({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', title: 'Added!', reason: 'Game has been added to your wishlist.' };
		}
		if (type && type === 'achievement') {
			if (userWishlist.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', title: 'Oops!', reason: 'Achievement is already in your wishlist.' };
			}
			userWishlist.insert({ userId: user._id, type: 'achievement', relationId: doc._id });
			return { status: 'success', title: 'Added!', reason: 'Achievement has been added to your wishlist.' };
		}
	},
	removeFromWishlist: function(type, doc) {
		var user = Meteor.user();
		if (type && type === 'game') {
			userWishlist.remove({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', title: 'Removed!', reason: 'Game has been removed from wishlist!' };
		}
		if (type && type === 'achievement') {
			userWishlist.remove({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', title: 'Removed!', reason: 'Achievement has been removed from wishlist!' };
		}
	},
	confirmAddToWishlist: function(type, doc, removeDocId) {
		var user = Meteor.user();
		userWishlist.remove({ userId: user._id, relationId: removeDocId});
		if (type && type === 'game') {
			userWishlist.insert({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', error: null };
		}
		if (type && type === 'achievement') {
			userWishlist.insert({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', error: null };
		}
	},
	addToTrophyCase: function(type, doc) {
		var user = Meteor.user();
		var trophyCaseCount = trophyCase.find({ userId: user._id}).count();
		if (trophyCaseCount >= 10) {
			return { status: 'confirm', error: null };
		}
		if (type && type === 'game') {
			if (trophyCase.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', error: 'game already in your trophy case'};
			}
			trophyCase.insert({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', error: null };
		}
		if (type && type === 'achievement') {
			if (trophyCase.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', error: 'acheivement already in your trophy case'};
			}
			trophyCase.insert({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', error: null };
		}
	},
	confirmAddToTrophyCase: function(type, doc, removeDocId) {
		var user = Meteor.user();
		trophyCase.remove({ userId: user._id, relationId: removeDocId});
		if (type && type === 'game') {
			trophyCase.insert({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', error: null };
		}
		if (type && type === 'achievement') {
			trophyCase.insert({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', error: null };
		}
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