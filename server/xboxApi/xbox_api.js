function xboxApiCaller (url, callback) {
	try {
		HTTP.get('https://xboxapi.com/v2/' + url, {headers: { 'X-AUTH' : '552ff8542ffd7c1f984b7fbf06462f10f659ae20' }}, function (error, result) {
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
				//Meteor._debug(error.response.statusCode);
				if (error.response.statusCode === 404) {
					var error = new Meteor.Error("xuidNotFound", "The gamertag you entered does not exist. Please try again.");
				}
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
			//var setObject = { $set: {} };

			if (i === 'gamercard') {
				updateGamercard(userId, result.data);
			}

			//if (i === 'xboxonegames') {
			//	updateXboxOneData(userId, result.data);
			//}

			if (i === 'xbox360games') {
				updateXbox360Data(userId, result.data);
			}
		});
		return "hello world";
	}
});

			/*
			if (i === 'xboxonegames' || i === 'xbox360games' ) {

				if (!result.data.titles) { return; }

				result.data.titles.forEach(function (j) {
					if (j.maxGamerscore === 0 || j.totalGamerscore === 0) return;
					var url = user.profile.xuid + '/achievements/' + j.titleId;
					var result = syncApiCaller(url);
					var gameId = j.titleId.toString();
					//Meteor._debug(result.data);

					if (!result.data.constructor === Array) { return; }

					Meteor._debug(result.data);

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
						setObject.$set = {lastPlayed
							lastUnlock: lastUnlock,
							gameId: gameId,
							userId: userId,
							currentGamerscore: j.currentGamerscore,
							earnedAchievements: earnedAchievements
						};

						userGames.upsert({ gameId: gameId, userId: userId }, setObject);

						var hexId = j.titleId.toString(16);
						var url = 'game-details-hex/' + hexId;
						var gameDetailsResult = syncApiCaller(url);

						if (gameDetailsResult !== 'undefined') {
							if (platform == 'Xenon') {
								Meteor._debug(j.name);
								//if (typeof j.earnedAchievements !== 'undefined') {
								if (gameDetailsResult.data.Items && gameDetailsResult.data.Items[0]) {
									var gameNameX = j.name,
										gameDescriptionX = gameDetailsResult.data.Items[0].Description,
										gameReducedDescX = gameDetailsResult.data.Items[0].ReducedDescription,
										gameReducedNameX = gameDetailsResult.data.Items[0].ReducedName,
										gameReleaseDateX = (typeof j.earnedAchievements !== 'undefined') ? gameDetailsResult.data.Items[0].ReleaseDate : gameDetailsResult.data.Items[0].Updated,
										gameIdX = gameId,
										gameGenreX = gameDetailsResult.data.Items[0].Genres,
										gameArtX = gameDetailsResult.data.Items[0].Images,
										gamePublisherNameX = gameDetailsResult.data.Items[0].PublisherName,
										gameParentalRatingX = gameDetailsResult.data.Items[0].ParentalRating,
										gameAllTimePlayCountX = gameDetailsResult.data.Items[0].AllTimePlayCount,
										gameSevenDaysPlayCountX = gameDetailsResult.data.Items[0].SevenDaysPlayCount,
										gameThirtyDaysPlayCountX = gameDetailsResult.data.Items[0].ThirtyDaysPlayCount,
										gameAllTimeRatingCountX = gameDetailsResult.data.Items[0].AllTimeRatingCount,
										gameAllTimeAverageRatingX = gameDetailsResult.data.Items[0].AllTimeAverageRating;
								} else {
									var gameNameX = j.name,
										gameDescriptionX = "This is an ordinary old game.",
										gameReducedDescX = "This is an ordinary old game.",
										gameReducedNameX = j.name,
										gameReleaseDateX = "2005-11-22T00:00:00Z",
										gameIdX = gameId,
										gameGenreX = "Miscellaneous",
										gameArtX = "/public\\/images\\/game-default.png",
										gamePublisherNameX = "Xbox 360",
										gameParentalRatingX = "Everyone",
										gameAllTimePlayCountX = 0,
										gameSevenDaysPlayCountX = 0,
										gameThirtyDaysPlayCountX = 0,
										gameAllTimeRatingCountX = 0,
										gameAllTimeAverageRatingX = 0;
								} 
								Meteor._debug(gameReleaseDateX);
								var releaseDate = new Date(parseInt(gameReleaseDateX.substr(6)));
								Meteor._debug(releaseDate);
							} else {
								//Meteor._debug(j.name);
								var gameNameX = j.name,
									gameDescriptionX = gameDetailsResult.data.Items[0].Description,
									gameReducedDescX = gameDetailsResult.data.Items[0].ReducedDescription,
									gameReducedNameX = gameDetailsResult.data.Items[0].ReducedName,
									gameReleaseDateX = gameDetailsResult.data.Items[0].ReleaseDate,
									gameIdX = gameId,
									gameGenreX = gameDetailsResult.data.Items[0].Genres,
									gameArtX = gameDetailsResult.data.Items[0].Images,
									gamePublisherNameX = gameDetailsResult.data.Items[0].PublisherName,
									gameParentalRatingX = gameDetailsResult.data.Items[0].ParentalRating,
									gameAllTimePlayCountX = gameDetailsResult.data.Items[0].AllTimePlayCount,
									gameSevenDaysPlayCountX = gameDetailsResult.data.Items[0].SevenDaysPlayCount,
									gameThirtyDaysPlayCountX = gameDetailsResult.data.Items[0].ThirtyDaysPlayCount,
									gameAllTimeRatingCountX = gameDetailsResult.data.Items[0].AllTimeRatingCount,
									gameAllTimeAverageRatingX = gameDetailsResult.data.Items[0].AllTimeAverageRating;
							}

							setObject.$set = {
								gameName: gameNameX,
								gameDescription: gameDescriptionX,
								gameReducedDesc: gameReducedDescX,
								gameReducedName: gameReducedNameX,
								gameReleaseDate: gameReleaseDateX,
								gameId: gameIdX,
								gameGenre: gameGenreX,
								gameArt: gameArtX,
								gamePublisherName: gamePublisherNameX,
								gameParentalRating: gameParentalRatingX,
								gameAllTimePlayCount: gameAllTimePlayCountX,
								gameSevenDaysPlayCount: gameSevenDaysPlayCountX,
								gameThirtyDaysPlayCount: gameThirtyDaysPlayCountX,
								gameAllTimeRatingCount: gameAllTimeRatingCountX,
								gameAllTimeAverageRating: gameAllTimeAverageRatingX
							};
							gameDetails.upsert({ gameId: gameId }, setObject );
						}
					} else {
						var platform = (typeof j.platform !== 'undefined') ? j.platform : 'Xenon';
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
			*/

// https://xboxapi.com/v2/xuid/djekl
// https://xboxapi.com/v2/gamertag/2533274805933072