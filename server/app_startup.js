Meteor.startup(function() {
	rssFeeds.insert({url: 'http://www.polygon.com/rss/group/news/index.xml'});

	ServiceConfiguration.configurations.remove({
		service: 'facebook'
	});

	ServiceConfiguration.configurations.insert({
		service: 'facebook',
		appId: Meteor.settings.services.facebookAppId,
		secret: Meteor.settings.services.facebookSecret
	});

	ServiceConfiguration.configurations.remove({
		service: "twitter"
	}); 

	ServiceConfiguration.configurations.insert({
		service: "twitter",
		consumerKey: Meteor.settings.services.twitterConsumerKey,
		loginStyle: "popup",
		secret: Meteor.settings.services.twitterSecret
	});

	// // config and Account email vesrification templates
	// // process.env.MAIL_URL="smtp://xboxdashbugreporter%40gmail.com:theskyisblue@smtp.gmail.com:465/";
	
	Mandrill.config({
		username: 'keith@xbdash.com',  // the email address you log into Mandrill with. Only used to set MAIL_URL.
		key: Meteor.settings.services.mandrillKey,  // get your Mandrill key from https://mandrillapp.com/settings/index
		port: 587,  // defaults to 465 for SMTP over TLS
		host: 'smtp.mandrillapp.com',  // the SMTP host
		baseUrl: 'https://mandrillapp.com/api/1.0/'  // update this in case Mandrill changes its API endpoint URL or version
	});

	Cloudinary.config({
		cloud_name: 'xbdash',
		api_key: Meteor.settings.services.cloudinaryKey,
		api_secret: Meteor.settings.services.cloudinarySecret
	});

	SyncedCron.start();

	userAchievements._ensureIndex({ "userId": 1, "progressState": 1 });
	userGames._ensureIndex({ "userId": 1, "currentGamerscore": -1 });
	xbdAchievements._ensureIndex({ "gameId": 1 });

	// var testLog = leaderboardsApi;
	// var users = Meteor.users.find({}, { limit: 5 });

	// if (users.count() > 0) {
	// 	users.forEach(function(user) {
	// 		leaderboardsApi.buildUserRanks(user._id);
	// 		leaderboardsApi.updateUserCounts(user._id);
	// 	});
	// 	Meteor.setInterval(function() {
	// 		leaderboardsApi.updateUserRanks();
	// 	}, 15000);
	// }

	// var xboxAO = xboxApiObject.chkGamertag('awdadwadw');

	// function that will check referral docs to see if the referee's email has been verified
	
	// Meteor.setInterval(function() {
	// var referrals = userReferrals.find({verified: false});
		
	// if (referrals) {
	//	referrals.forEach(function(referral) {
	//		var referee = Meteor.users.findOne({_id: referral.refereeId});
	// 		if (!referee.emails[0].verified) {
	// 			return;	
	// 			Meteor._debug("the email isnt verified" + referee.emails[0].verified);
	// 		}
	// 		Meteor._debug("the referral should be set to true");
	// 		userReferrals.update({_id: referral._id}, {$set: {verified: true}});
	// 		Meteor.users.update({_id: referral.referrerId}, {$inc: {userReferralCount: 1}});
	// 	});
	// }
	// }, 1000);
	
});