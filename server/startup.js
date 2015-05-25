//server
Meteor.startup(function() {

	//function to update user data if they are currently active on the site
	Meteor.setInterval(function() {
		var users = Meteor.users.find({ "status.online": true });
		Meteor._debug("user function firing");
		if (!users.count()) {
			Meteor._debug("there are no users online currently");
			return;
		}
		users.forEach(function(user) {
			//Meteor._debug("these ids are online: " + user._id);
			updateUserData(user._id);
		});
	}, 50000);

	//function to give users an overall rank according to gamerscore
	Meteor.setInterval(function() {
		var users = Meteor.users.find({"profile.gamercard.gamerscore": {$gt: 1}}, {$sort: {"profile.gamercard.gamerscore": -1}});
		var userOverallRank = 1;
		if (!users.count()) {
			Meteor._debug("there is no one signed up");
			return;
		}
		users.forEach(function(user) {
			Meteor._debug("user ID is: " + user._id);
			Meteor.users.upsert({_id: user._id}, {$set: {"profile.userOverallRank": userOverallRank}});
			userOverallRank++;
		});

	}, 5000);

	//function to count a users gamerscore gains for the day and creating a daily rank according to gamerscore
	Meteor.setInterval(function() {
		var count = 0;
		var users = Meteor.users.find({"profile.gamercard.gamerscore": {$gt: 1}});
		var oneDay = moment().startOf('day').toDate();

		//find each users gamerscore for the past 24 hours and put it into a field called userDailyGamerscore
		users.forEach(function(user){
			var userDailyAchievements = userAchievements.find({userId: user._id, progressState: true, progression: {$gte: oneDay}});
			if (!userDailyAchievements.count()) {
				Meteor._debug("this guys a fool and hasnt achieved anything today");
				return;
			}
			var userDailyGamerscore = 0;
			userDailyAchievements.forEach(function(achievement) {
				count++;
				Meteor._debug("achievement is here: " + achievement.achievementId);
				var singleAchievement = xbdAchievements.findOne(achievement.achievementId);
				//Meteor._debug(singleAchievement);
				Meteor._debug(singleAchievement.value);
				userDailyGamerscore += singleAchievement.value;
				//Meteor._debug(userDailyGamerscore);
			});
			Meteor.users.upsert({_id: user._id}, {$set: {"profile.userDailyGamerscore": userDailyGamerscore}});
			Meteor._debug(count);
		});

		//find each user and assign them a daily rank based upon the above computed userDailyGamerscore
		var users = Meteor.users.find({"profile.gamercard.gamerscore": {$gt: 1}}, {$sort: {"profile.userDailyGamerscore": -1}});
		var userDailyRank = 1;
		users.forEach(function(user){
			Meteor.users.upsert({_id: user._id}, {$set: {"profile.userDailyRank": userDailyRank}});
			userDailyRank++;
		});
	}, 5000);

});

function userUpdater(user) {
	var userId = user._id;
	//Meteor._debug(user);
	// user game check, if no then
	// xbdGames check, if no, insert the game to xbdgames
	// then insert gameDetails, insert usergame, insert the achievements for the game

	[
	'xboxonegames',
	'xbox360games'
	].forEach(function(i) {
		var url = user.profile.xuid + '/' + i;
		var result = syncApiCaller(url);
		var setObject = { $set: {} };

		if (!result.data.titles) { return; }

		result.data.titles.forEach(function (j) {
			if (j.maxGamerscore === 0 || j.totalGamerscore === 0) return;
			var gameId = j.titleId.toString();
			var earnedAchievements = (typeof j.earnedAchievements !== 'undefined') ? j.earnedAchievements : j.currentAchievements;
			var userGameCheck = userGames.findOne({ gameId: gameId, userId: user._id });
			var xbdGameCheck = xbdGames.findOne({ _id: gameId});
			var url = user.profile.xuid + '/achievements/' + j.titleId;
			//var result = syncApiCaller(url);

			//Meteor._debug(xbdGameCheck);
			//Meteor._debug(userGameCheck);

			if (typeof userGameCheck === 'undefined') {
				if (typeof xbdGameCheck === 'undefined') {
					var maxGamerscore = (typeof j.maxGamerscore !== 'undefined') ? j.maxGamerscore : j.totalGamerscore;
					var platform = (typeof j.platform !== 'undefined') ? j.platform : 'Xenon';

					var singleGame = {
						_id: gameId,
						platform: platform,
						name: j.name,
						titleType: j.titleType,
						maxGamerscore: maxGamerscore
					};

					var lastUnlock = (typeof j.lastUnlock !== 'undefined') ? j.lastUnlock : j.lastPlayed;
					lastUnlock = new Date(lastUnlock);

					//Meteor._debug(singleGame);
					var gameId = xbdGames.insert(singleGame);

					//upsert for userGames table update or insert
					setObject.$set = {
						lastUnlock: lastUnlock,
						gameId: gameId,
						userId: userId,
						currentGamerscore: j.currentGamerscore,
						earnedAchievements: earnedAchievements
					};

					userGames.upsert({ gameId: gameId, userId: userId }, setObject);

					var hexId = j.titleId.toString(16);
					var url = 'game-details-hex/' + hexId;
					//Meteor._debug(url);
					var gameDetailsResult = syncApiCaller(url);
					//Meteor._debug(gameDetailsResult.data.Items[0].Images);

					setObject.$set = {
						gameName: j.name,
						gameDescription: gameDetailsResult.data.Items[0].Description,
						gameReducedDesc: gameDetailsResult.data.Items[0].ReducedDescription,
						gameReducedName: gameDetailsResult.data.Items[0].ReducedName,
						gameReleaseDate: gameDetailsResult.data.Items[0].ReleaseDate,
						gameId: gameId,
						gameGenre: gameDetailsResult.data.Items[0].Genres,
						gameArt: gameDetailsResult.data.Items[0].Images,
						gamePublisherName: gameDetailsResult.data.Items[0].PublisherName,
						gameParentalRating: gameDetailsResult.data.Items[0].ParentalRating,
						gameAllTimePlayCount: gameDetailsResult.data.Items[0].AllTimePlayCount,
						gameSevenDaysPlayCount: gameDetailsResult.data.Items[0].SevenDaysPlayCount,
						gameThirtyDaysPlayCount: gameDetailsResult.data.Items[0].ThirtyDaysPlayCount,
						gameAllTimeRatingCount: gameDetailsResult.data.Items[0].AllTimeRatingCount,
						gameAllTimeAverageRating: gameDetailsResult.data.Items[0].AllTimeAverageRating
					};
					gameDetails.upsert({ gameId: gameId }, setObject );
				} else {
					var lastUnlock = (typeof j.lastUnlock !== 'undefined') ? j.lastUnlock : j.lastPlayed;
					lastUnlock = new Date(lastUnlock);

					// gameid is a number
					var gameId = xbdGameCheck._id;

					//upsert for userGames table update or insert
					setObject.$set = {
						lastUnlock: lastUnlock,
						userId: userId,
						currentGamerscore: j.currentGamerscore,
						earnedAchievements: earnedAchievements
					};
					userGames.upsert({ gameId: gameId, userId: userId }, setObject);
				}

				var result = syncApiCaller(url);

				if (!result.data.constructor === Array) { return; }

				result.data.forEach(function (k) {
					var achievementCheck = xbdAchievements.findOne({ gameId: gameId, name: k.name });

					if (typeof k.progressState !== 'undefined') { var progressState = (k.progressState !== 'NotStarted') ? true : false; } else { var progressState = (k.unlocked !== false) ? true : false; }

					var progression = (typeof k.progression !== 'undefined') ? k.progression.timeUnlocked : k.timeUnlocked;
					progression = new Date(progression);

					var mediaAssets = (typeof k.mediaAssets !== 'undefined') ? k.mediaAssets[0].url : k.imageUnlocked;
					
					var gsValue = k.rewards && k.rewards.length ? k.rewards[0].value : k.value;
					if (typeof gsValue === 'undefined') { gsValue = k.gamerscore; }

					if (typeof achievementCheck === 'undefined') {
						// add single achievemnt
	                    var singleAchievement = {
	                    	//gameId: k.titleAssociations[0].id,
	                    	gameId: gameId,
	                    	name: k.name,
	                    	mediaAssets: mediaAssets,
	                    	isSecret: k.isSecret,
	                    	description: k.description,
	                    	lockedDescription: k.lockedDescription,
	                    	value: gsValue
	                    };
	                    // achievement id is a string
	                    var achievementId = xbdAchievements.insert(singleAchievement);

	                    // update/insert user achievement
	                    setObject.$set = {
	                    	achievementId: achievementId,
	                		userId: userId,
	                		progressState: progressState,
	                		progression: progression
	                	};
	                    userAchievements.upsert({ achievementId: achievementId, userId: userId }, setObject);
	                } else {
	                	var achievementId = achievementCheck._id;

	                	setObject.$set = {
	                    	achievementId: achievementId,
	                		userId: userId,
	                		progressState: progressState,
	                		progression: progression
	                	};
	                	userAchievements.upsert({ achievementId: achievementId, userId: userId }, setObject);
	                }
	            });
			} else {
				if (userGameCheck.currentGamerscore < j.currentGamerscore) {
					var lastUnlock = (typeof j.lastUnlock !== 'undefined') ? j.lastUnlock : j.lastPlayed;
					lastUnlock = new Date(lastUnlock);

					setObject.$set = {
						lastUnlock: lastUnlock,
						userId: userId,
						currentGamerscore: j.currentGamerscore,
						earnedAchievements: earnedAchievements
					}
					userGames.upsert({ gameId: gameId, userId: userId }, setObject);
					
					var result = syncApiCaller(url);

					if (!Object.prototype.toString.call(result.data) === '[object Array]') { return; }

					result.data.forEach(function (k) {
						var achievementCheck = xbdAchievements.findOne({ gameId: gameId, name: k.name });

						if (typeof k.progressState !== 'undefined') { var progressState = (k.progressState !== 'NotStarted') ? true : false; } else { var progressState = (k.unlocked !== false) ? true : false; }

						var progression = (typeof k.progression !== 'undefined') ? k.progression.timeUnlocked : k.timeUnlocked;
						progression = new Date(progression);

						var mediaAssets = (typeof k.mediaAssets !== 'undefined') ? k.mediaAssets[0].url : k.imageUnlocked;
					
						var gsValue = k.rewards && k.rewards.length ? k.rewards[0].value : k.value;
						if (typeof gsValue === 'undefined') { gsValue = k.gamerscore; }

						if (typeof achievementCheck === 'undefined') {
							// add single achievemnt
		                    var singleAchievement = {
		                    	//gameId: k.titleAssociations[0].id,
		                    	gameId: gameId,
		                    	name: k.name,
		                    	mediaAssets: mediaAssets,
		                    	isSecret: k.isSecret,
		                    	description: k.description,
		                    	lockedDescription: k.lockedDescription,
		                    	value: gsValue
		                    };
		                    // achievement id is a string
		                    var achievementId = xbdAchievements.insert(singleAchievement);

		                    // update/insert user achievement
		                    setObject.$set = {
		                    	achievementId: achievementId,
		                		userId: userId,
		                		progressState: progressState,
		                		progression: progression
		                	};
		                    userAchievements.upsert({ achievementId: achievementId, userId: userId }, setObject);
		                } else {
		                	var achievementId = achievementCheck._id;

		                	setObject.$set = {
		                		progressState: progressState,
		                		progression: progression
		                	};
		                	userAchievements.upsert({ achievementId: achievementId, userId: userId }, setObject);
		                }
		            });
				}
			}
		});
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
		//Meteor._debug(result);

		if (user.profile.gamercard.gamerscore < result.data.gamerscore) {
			Meteor._debug("gamerscore");
			Meteor.users.upsert({ _id: user._id }, { $set: { 'profile.gamercard': result.data } });
			userUpdater(user);
		}
	} else { return; }
}

UserStatus.events.on("connectionLogin", function(fields) {
	
});

UserStatus.events.on("connectionLogout", function(fields) {
	
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