Meteor.startup(function() {
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

	Mandrill.config({
		username: 'keith@xbdash.com',
		key: Meteor.settings.services.mandrillKey,
		port: 587,
		host: 'smtp.mandrillapp.com',
		baseUrl: 'https://mandrillapp.com/api/1.0/'
	});

	Cloudinary.config({
		cloud_name: 'xbdash',
		api_key: Meteor.settings.services.cloudinaryKey,
		api_secret: Meteor.settings.services.cloudinarySecret
	});

	xbdJobsCollection.setLogStream(process.stdout);

	xbdJobsCollection.startJobServer();

	// SyncedCron.start();

	userAchievements._ensureIndex({ "userId": 1, "progressState": 1 });
	userGames._ensureIndex({ "userId": 1, "currentGamerscore": -1 });
	xbdAchievements._ensureIndex({ "gameId": 1 });
});