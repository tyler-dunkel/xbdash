function xboxApiCaller (url, callback) {
	HTTP.get('https://xboxapi.com/v2/' + url, {headers: { 'X-AUTH' : '552ff8542ffd7c1f984b7fbf06462f10f659ae20' }}, function (error, result){
		rateLimitRemaining = result.headers['x-ratelimit-remaining'];
		if (rateLimitRemaining) {
			Meteor._debug('Calls Left: ' + rateLimitRemaining);
		}
		callback(null, result);
	});
};

var syncApiCaller = Async.wrap(xboxApiCaller);

Meteor.methods({
	chkGamertag: function(gamertag) {

		var url = 'xuid/' + gamertag;
		var response = syncApiCaller(url);

		var xuid = response.content;
		var userExists = Meteor.users.findOne({"profile.xuid": xuid});

		if ( response.statusCode === 200 || response.statusCode === 201 ) {
			if (userExists) {
				throw new Meteor.Error("gamertagExists", "Gamertag is already registered", "This gamertag has already been registered. If you are sure this is your gamertag, please contact us at <a href='mailto:support@xboxdash.com' style='color: #0000dd'>support@xboxdash.com</a>!");
			} else {
				Meteor._debug("200 fired and returned content");
				return {content: response.content, statusCode: response.statusCode};
			}
		} else {
			throw new Meteor.Error("gamertagNotFound", "Gamertag Not Found", "If you are sure you entered the correct gamertag, please contact us at <a href='mailto:support@xboxdash.com' style='color: #0000dd'>support@xboxdash.com</a>!");
		}
	},
	retrieveData: function(user) {
		//Meteor._debug(user);
		[
		'gamercard',
		'xboxonegames'
		].forEach(function(i) {
			var url = user.profile.xuid + '/' + i;
			var result = syncApiCaller(url);
			var userId = Meteor.userId();
			var setObject = { $set: {} };

			if (i === 'gamercard') {
				setObject.$set['profile.' + i] = result.data;
				Meteor.users.upsert(userId, setObject);
			}

			if (i === 'xboxonegames') {
				//Meteor._debug('xboxone games is here');
				result.data.titles.forEach(function (j) {
					if (j.maxGamerscore === 0) return;
					var url = user.profile.xuid + '/achievements/' + j.titleId;
					var result = syncApiCaller(url);
					//Meteor._debug(j);

					result.data.forEach(function (k) {
						var achievementCheck = xbdAchievements.findOne({ gameId: k.titleAssociations[0].id, name: k.name });

						if (typeof achievementCheck === 'undefined') {
							// add single achievemnt
	                        var singleAchievement = {
	                        	gameId: k.titleAssociations[0].id,
	                        	name: k.name,
	                        	mediaAssets: k.mediaAssets,
	                        	isSecret: k.isSecret,
	                        	description: k.description,
	                        	lockedDescription: k.lockedDescription,
	                        	achievementType: k.achievementType,
	                        	rewards: k.rewards
	                        };
	                        var achievementId = xbdAchievements.insert( singleAchievement );

	                        // update/insert user achievement
	                        setObject.$set = {
		                    	achievementId: achievementId,
	                    		userId: userId,
	                    		progressState: k.progressState
	                    	};
	                        userAchievements.upsert({ achievementId: achievementId, userId: userId }, setObject);
	                    } else {
	                    	var achievementId = achievementCheck._id;

	                    	setObject.$set = {
		                    	achievementId: achievementId,
	                    		userId: userId,
	                    		progressState: k.progressState
	                    	};
	                    	userAchievements.upsert({ achievementId: achievementId, userId: userId }, setObject);
	                    }
                    });

					//insert single game into database if not there
					var gameCheck = xbdGames.findOne({_id: j.titleId});
					var _id = j.titleId.toString();
					if (typeof gameCheck === 'undefined') {
						var singleGame = {
							_id: _id,
							platform: j.platform,
							name: j.name,
							titleType: j.titleType,
							maxGamerscore: j.maxGamerscore
						};
						Meteor._debug(singleGame);
						var gameId = xbdGames.insert(singleGame);

						//upsert for userGames table update or insert
						setObject.$set = {
							_id: _id,
							userId: userId,
							currentGamerscore: j.currentGamerscore,
							earnedAchievements: j.earnedAchievements
						};
						userGames.upsert({_id: _id, userId: userId}, setObject);

					} else {
						var gameId = gameCheck._id;

						//upsert for userGames table update or insert
						setObject.$set = {
							_id: _id,
							userId: userId,
							currentGamerscore: j.currentGamerscore,
							earnedAchievements: j.earnedAchievements
						};
						userGames.upsert({_id: _id, userId: userId}, setObject);
					}

                    /* keith - working on game insertion here, we need to convert the titleIds to Hex's because that is how the API takes it
                    var gameHex = j.titleId.toString(16); // converts titleId to Hex
                    var url2 = 'game-details-hex/' + j.titleId;
					var result2 = syncApiCaller(url2);

                    if (!xbdGames.findOne({ gameHex: gameHex })) {
                    	result2.data.forEach(function (l) {
	                    	xbdGames.upsert({ gameHex: gameHex }, { $set: result2.data.Items[0] });
	                    });
                    }
                    */
				});
			}
		});
		return "hello world";
	}
});

// https://xboxapi.com/v2/xuid/djekl
// https://xboxapi.com/v2/gamertag/2533274805933072