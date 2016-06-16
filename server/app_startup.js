Meteor.startup(function() {

	if (xbdContests.find({}).count() < 1) {
		xbdContests.insert({ status: 'active', contestToken: 'xbdDirect', entries: [] });
	}

	ServiceConfiguration.configurations.remove({
		service: 'facebook'
	});

	ServiceConfiguration.configurations.insert({
		service: 'facebook',
		appId: Meteor.settings.public.facebookAppId,
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

	process.env.MAIL_URL = "smtp://postmaster%40email.xbdash.com:" + Meteor.settings.services.mailgunKey + "@smtp.mailgun.org:587";
	
	Cloudinary.config({
		cloud_name: 'xbdash',
		api_key: Meteor.settings.services.cloudinaryKey,
		api_secret: Meteor.settings.services.cloudinarySecret
	});

	xbdJobsCollection.startJobServer();

	userAchievements._ensureIndex({ "userId": 1, "progressState": 1 });
	userGames._ensureIndex({ "userId": 1, "currentGamerscore": -1 });
	xbdAchievements._ensureIndex({ "gameId": 1 });
});
