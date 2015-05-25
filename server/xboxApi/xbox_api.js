function xboxApiCaller (url, callback) {
	try {
		HTTP.get('https://xboxapi.com/v2/' + url, {headers: { 'X-AUTH' : '552ff8542ffd7c1f984b7fbf06462f10f659ae20' }}, function (error, result){
			if (!error) {
				var rateLimitRemaining = result.headers['x-ratelimit-remaining'];
				if (rateLimitRemaining > 0) {
					Meteor._debug("rate limit is more than 0");
					Meteor._debug("Calls Left: " + rateLimitRemaining);
					callback(null, result);
				} else {
					var error = new Meteor.Error("rateLimitExpired", "Rate limit has expired.");
					callback(error, null);
				}
			} else {
				var error = new Meteor.Error("serverError", "The server isn't reachable.");
				callback(error, null);
			}
		});
	} catch (error) {
		// If the API responded with an error message and a payload 
	    if (error.response) {
	      var errorCode = error.response.data.code;
	      var errorMessage = error.response.data.message;
	    // Otherwise use a generic error message
	    } else {
	      var errorCode = 500;
	      var errorMessage = 'Cannot access the API';
	    }
	    // Create an Error object and return it via callback
	    var myError = new Meteor.Error(errorCode, errorMessage);
	    callback(myError, null);
	}
};

syncApiCaller = Async.wrap(xboxApiCaller);

Meteor.methods({
	chkGamertag: function(gamertag) {
		check(gamertag, String);
		var url = 'xuid/' + gamertag;
		var response = syncApiCaller(url);

		var xuid = response.content;
		var userExists = Meteor.users.findOne({"profile.xuid": xuid});

		if (response.statusCode === 200 || response.statusCode === 201) {
			if (userExists) {
				throw new Meteor.Error("gamertagExists", "Gamertag is already registered", "This gamertag has already been registered. If you are sure this is your gamertag, please contact us at <a href='mailto:support@xboxdash.com' style='color: #0000dd'>support@xboxdash.com</a>!");
			} else {
				return {content: response.content, statusCode: response.statusCode};
			}
		} else {
			throw new Meteor.Error("gamertagNotFound", "Gamertag Not Found", "If you are sure you entered the correct gamertag, please contact us at <a href='mailto:support@xboxdash.com' style='color: #0000dd'>support@xboxdash.com</a>!");
		}
	},
	retrieveData: function(user) {
		check(user.profile.xuid, String);
		check(user.username, String);
		var userId = Meteor.userId();
		var setGamertag = Meteor.users.find({_id: userId}, {username: {$exists: true}});

		if (typeof setGamertag !== 'undefined') {
			Meteor.users.upsert({_id: userId}, {$set: {username: user.username, "profile.xuid": user.profile.xuid}});
		}

		[
		'gamercard',
		'xboxonegames',
		'xbox360games'
		].forEach(function(i) {
			var url = user.profile.xuid + '/' + i;
			var result = syncApiCaller(url);
			var setObject = { $set: {} };

			if (i === 'gamercard') {
				setObject.$set['profile.' + i] = result.data;
				Meteor.users.upsert(userId, setObject);
			}

			if (i === 'xboxonegames' || i === 'xbox360games') {
				
				if (!result.data.titles) { return; }

				result.data.titles.forEach(function (j) {
					if (j.maxGamerscore === 0 || j.totalGamerscore === 0) return;
					var url = user.profile.xuid + '/achievements/' + j.titleId;
					var result = syncApiCaller(url);
					var gameId = j.titleId.toString();
					//Meteor._debug(result.data);

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

					//insert single game into database if not there
					var gameCheck = xbdGames.findOne({ _id: gameId });
					//var _id = j.titleId.toString();

					if (typeof gameCheck === 'undefined') {
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

						var earnedAchievements = (typeof j.earnedAchievements !== 'undefined') ? j.earnedAchievements : j.currentAchievements;
						
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
						var gameId = gameCheck._id;

						var earnedAchievements = (typeof j.earnedAchievements !== 'undefined') ? j.earnedAchievements : j.currentAchievements;

						//upsert for userGames table update or insert
						setObject.$set = {
							lastUnlock: lastUnlock,
							userId: userId,
							currentGamerscore: j.currentGamerscore,
							earnedAchievements: earnedAchievements
						};
						userGames.upsert({ gameId: gameId, userId: userId }, setObject);
					}
				});
			}
		});
		return "hello world";
	}
});

// https://xboxapi.com/v2/xuid/djekl
// https://xboxapi.com/v2/gamertag/2533274805933072