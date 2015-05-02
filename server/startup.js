//server
Meteor.startup(function() {

});

function userUpdater(userId) {
	var user = Meteor.users.findOne(userId);

	[
	'xboxonegames',
	'xbox360games'
	].forEach(function(i) {
		var url = user.profile.xuid + '/' + i;
		var result = syncApiCaller(url);
		var setObject = { $set: {} };
		//Meteor._debug(result);

		if (i === 'xboxonegames' || i === 'xbox360games') {
			if (user.profile.gamercard.gamerscore < result.data.titles.currentGamerscore) {
				result.data.titles.forEach(function (j) {
					var url = user.profile.xuid + '/achievements/' + j.titleId;
					var result = syncApiCaller(url);
					var gameId = j.titleId.toString();
					//Meteor._debug(result.data);
					//Meteor.users.upsert({ _id: user._id }, { $set: { 'profile.gamercard': result.data } });
					
					result.data.forEach(function (k) {
						var achievementId = xbdAchievements.findOne(gameId)._id;
						if (typeof k.progressState !== 'undefined') { var progressState = (k.progressState !== 'NotStarted') ? true : false; } else { var progressState = (k.unlocked !== false) ? true : false; }

						if (userAchievements.progressState !== result.data.progressState) {
							var progression = (typeof k.progression !== 'undefined') ? k.progression.timeUnlocked : k.timeUnlocked;
							var mediaAssets = (typeof k.mediaAssets !== 'undefined') ? k.mediaAssets[0].url : k.imageUnlocked;
							var gsValue = k.rewards && k.rewards.length ? k.rewards[0].value : k.value;

		                	setObject.$set = {
		                    	achievementId: achievementId,
		                		userId: userId,
		                		progressState: progressState,
		                		progression: progression
		                	};
		                	userAchievements.upsert({ userId: user._id }, setObject);
		                }
					});

					var earnedAchievements = (typeof j.earnedAchievements !== 'undefined') ? j.earnedAchievements : j.currentAchievements;

					if (userGames.earnedAchievements !== earnedAchievements) {
						setObject.$set = {
							userId: userId,
							currentGamerscore: j.currentGamerscore,
							earnedAchievements: earnedAchievements
						};
						userGames.upsert({ userId: user._id }, setObject);
					}
				});
			}
		}
	});
}

function updateUserData(userId) {
	//Meteor._debug(userId);
	var user = Meteor.users.findOne(userId);
	//Meteor._debug(user);
	if (typeof user.profile.gamercard !== 'undefined') {
		Meteor._debug("fires when gamercard is present");

		var url = user.profile.xuid + '/gamercard';
		var result = syncApiCaller(url);
		Meteor._debug(result);

		if (user.profile.gamercard.gamerscore < result.data.gamerscore) {
			Meteor._debug("gamerscore");
			Meteor.users.upsert({ _id: user._id }, { $set: { 'profile.gamercard': result.data } });
			userUpdater(user._id);
		}
	} else { return; }
}

UserStatus.events.on("connectionLogin", function(fields) {
	Meteor._debug("this is the connectionActive function");
	var updateUserDataTimer = Meteor.setInterval(function() {
		updateUserData(fields.userId);
	}, 500000);
});

process.env.MAIL_URL="smtp://xboxdashbugreporter%40gmail.com:theskyisblue@smtp.gmail.com:465/";
Meteor.methods({
	contactUsEmail: function(name, email, subject, text) {
		Email.send({
			from: "xboxdashbugreporter@gmail.com",
			to: "kguirao87@gmail.com",
			subject: subject,
			text: text
		});
	}
});