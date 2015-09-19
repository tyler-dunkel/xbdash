Meteor.startup(function() {

	ServiceConfiguration.configurations.remove({
		service: 'facebook'
	});

	ServiceConfiguration.configurations.insert({
		service: 'facebook',
		appId: '109259765831650',
		secret: '5d426e68a123871b8f051262b0f86f7b'
	});

	ServiceConfiguration.configurations.remove({
		service: "twitter"
	});

	ServiceConfiguration.configurations.insert({
		service: "twitter",
		consumerKey: "UVos5UTOWCXMAUGDzvEcyHqAZ",
		loginStyle: "popup",
		secret: "9TDyJr6AK3BcONuagMN7eeBD5xWHON41UD5HxkIoymUtxvz3Dh"
	});
	//config and Account email verification templates
	//process.env.MAIL_URL="smtp://xboxdashbugreporter%40gmail.com:theskyisblue@smtp.gmail.com:465/";
	Mandrill.config({
		username: 'keith@xbdash.com',  // the email address you log into Mandrill with. Only used to set MAIL_URL.
		key: 'Ex1VrXdHhGPIZE6D3a75BQ',  // get your Mandrill key from https://mandrillapp.com/settings/index
		port: 587,  // defaults to 465 for SMTP over TLS
		host: 'smtp.mandrillapp.com',  // the SMTP host
		baseUrl: 'https://mandrillapp.com/api/1.0/'  // update this in case Mandrill changes its API endpoint URL or version
	});

	userAchievements._ensureIndex({ "userId": 1, "progressState": 1 });
	userGames._ensureIndex({ "userId": 1, "currentGamerscore": -1 });
	xbdAchievements._ensureIndex({ "gameId": 1 });

	//function that will check referral docs to see if the referee's email has been verified
	/*
	Meteor.setInterval(function() {
		var referrals = userReferrals.find({verified: false});
		
		if (referrals) {
			referrals.forEach(function(referral) {
				var referee = Meteor.users.findOne({_id: referral.refereeId});
				if (!referee.emails[0].verified) {
					return;	
					Meteor._debug("the email isnt verified" + referee.emails[0].verified);
				}
				Meteor._debug("the referral should be set to true");
				userReferrals.update({_id: referral._id}, {$set: {verified: true}});
				Meteor.users.update({_id: referral.referrerId}, {$inc: {userReferralCount: 1}});
			});
		}
	}, 1000);
	*/
});