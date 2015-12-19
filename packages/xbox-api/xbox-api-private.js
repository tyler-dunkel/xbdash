xboxApiPrivate = xboxApiPrivate || {};

//private package functions to update xbox one and 360 data for users. NOT accessable outside of the package

//xbox one private functions

xboxApiPrivate._updateXboxOneAchievementsData = function(userId, gameId) {
	console.log("_updateXboxOneAchievementsData func is firing");
	
	var user = Meteor.users.findOne({ _id: userId });
	var url = user.xuid + '/achievements/' + gameId;

	try {
		var result = syncApiCaller(url);
	} catch (e) {
		console.log("error in calling the api: " + e.reason);
		return;
	}

	if (!result || !result.data) {
		console.log(EJSON.stringify(result));
		return;
	}

	if (_.isEmpty(result.data)) {
		console.log(EJSON.stringify(result));
		return;
	}

	result.data.forEach(function (achievement) {
		var achievementCheck = xbdAchievements.findOne({ gameId: gameId, name: achievement.name });
		var progressState = (achievement.progressState !== 'NotStarted') ? true : false;
		var progression = achievement.progression.timeUnlocked;
		progression = new Date(progression);
		var achievementInserted = false;
		var achievementValue = achievement.rewards && achievement.rewards.length ? achievement.rewards[0].value : achievement.value;

		//we must check if we already have an xbdAchievement record for this achievement i.e. one not tied to a user.
		//if we do not, we have to insert the relevant fields into the xbdAchievement doc for this acheivement. 
		if (!achievementCheck) {
			var singleAchievement = {
				gameId: gameId,
				name: achievement.name,
				mediaAssets: achievement.mediaAssets[0].url,
				isSecret: achievement.isSecret,
				description: achievement.description,
				lockedDescription: achievement.lockedDescription,
				value: achievementValue,
				userPercentage: 0
			};
			achievementCheck = xbdAchievements.insert(singleAchievement);
			achievementInserted = true;
		}

		//if we did not insert an xbdAchievement, then we will set achievement check to the _id so we can use the field to relate the user 
		//achievement doc to the xbdAchievement. 
		if (!achievementInserted) {
			achievementCheck = achievementCheck._id;
		}

		var userAchievement = {
			achievementId: achievementCheck,
			userId: userId,
			progressState: progressState,
			progression: progression
		};
		userAchievements.upsert({ achievementId: achievementCheck, userId: userId }, { $set: userAchievement });
	});
}

xboxApiPrivate._updateXboxOneGameData = function(userId, game, gameId) {
	var gameCheck = xbdGames.findOne({ _id: gameId });
	var lastUnlock = game.lastUnlock;
	lastUnlock = new Date(lastUnlock);
	var gameInserted = false;

	if (!gameCheck) {
		var singleGame = {
			_id: gameId,
			platform: game.platform,
			name: game.name,
			titleType: game.titleType,
			maxGamerscore: game.maxGamerscore
		};
		gameCheck = xbdGames.insert(singleGame);
		gameInserted = true;
	}

	if (!gameInserted) {
		gameCheck = gameCheck._id;
	}

	var completed = game.maxGamerscore > game.currentGamerscore ? false : true;

	var userGame = {
		lastUnlock: lastUnlock,
		gameId: gameId,
		userId: userId,
		currentGamerscore: game.currentGamerscore,
		earnedAchievements: game.earnedAchievements,
		completed: completed
	};
	userGames.upsert({ gameId: gameId, userId: userId }, { $set: userGame });
}

xboxApiPrivate._updateXboxOneGameDetails = function(userId, game, gameId) {
	console.log("_updateXboxOneGameDetails func is firing");
	var hexId = game.titleId.toString(16);
	var url = 'game-details-hex/' + hexId;

	try {
		var result = syncApiCaller(url);
	} catch (e) {
		console.log("error updating xbox one game details: " + e.reason);
	}

	if (!result || !result.data || !result.data.Items) {
		console.log(EJSON.stringify(result));
		return;
	}

	var gameDetail = {
		gameName: game.name,
		gameDescription: result.data.Items[0].Description,
		gameReducedDescription: result.data.Items[0].ReducedDescription,
		gameReducedName: result.data.Items[0].ReducedName,
		gameReleaseDate: result.data.Items[0].ReleaseDate,
		gameId: gameId,
		gameGenre: result.data.Items[0].Genres,
		gameArt: result.data.Items[0].Images,
		gamePublisherName: result.data.Items[0].PublisherName,
		gameParentalRating: result.data.Items[0].ParentalRating,
		gameAllTimePlayCount: result.data.Items[0].AllTimePlayCount,
		gameSevenDaysPlayCount: result.data.Items[0].SevenDaysPlayCount,
		gameThirtyDaysPlayCount: result.data.Items[0].ThirtyDaysPlayCount,
		gameAllTimeRatingCount: result.data.Items[0].AllTimeRatingCount,
		gameAllTimeAverageRating: result.data.Items[0].AllTimeAverageRating
	};
	gameDetails.upsert({ gameId: gameId }, { $set: gameDetail });
}

//xbox 360 private functions

xboxApiPrivate._updateXbox360AchievementsData = function(userId, gameId) {
	var user = Meteor.users.findOne({ _id: userId });
	var url = user.xuid + '/achievements/' + gameId;
	
	try {
		var result = syncApiCaller(url);
	} catch (e) {
		console.log("error in calling the api: " + e.reason);
		return;
	}

	if (!result || !result.data) {
		console.log(EJSON.stringify(result));
		return;
	}

	if (_.isEmpty(result.data)) {
		console.log(EJSON.stringify(result));
		return;
	}

	try {
		result.data.forEach(function (achievement) {
			var achievementCheck = xbdAchievements.findOne({ gameId: gameId, name: achievement.name });
			var progressState = (achievement.unlocked !== false) ? true : false;
			var progression = new Date(achievement.timeUnlocked);
			var achievementInserted = false;

			if (typeof achievementCheck === 'undefined') {
				var singleAchievement = {
					gameId: gameId,
					name: achievement.name,
					mediaAssets: achievement.imageUnlocked,
					isSecret: achievement.isSecret,
					description: achievement.description,
					lockedDescription: achievement.lockedDescription,
					value: achievement.gamerscore,
					userPercentage: 0
				};
				achievementCheck = xbdAchievements.insert(singleAchievement);
				achievementInserted = true;
			}

			if (!achievementInserted) {
				achievementCheck = achievementCheck._id;
			}

			var userAchievement = {
				achievementId: achievementCheck,
				userId: userId,
				progressState: progressState,
				progression: progression
			};
			userAchievements.upsert({ achievementId: achievementCheck, userId: userId }, { $set: userAchievement });
		});
	} catch (error) {
		console.log(EJSON.stringify(result));
		return;
	}
}

xboxApiPrivate._updateXbox360GameData = function(userId, game, gameId) {
	var gameCheck = xbdGames.findOne({ _id: gameId });
	var lastPlayed = new Date(game.lastPlayed);
	var gameInserted = false;

	if (typeof gameCheck === 'undefined') {
		var singleGame = {
			_id: gameId,
			platform: 'Xenon',
			name: game.name,
			titleType: game.titleType,
			maxGamerscore: game.totalGamerscore
		};
		gameCheck = xbdGames.insert(singleGame);
		gameInserted = true;
	}

	if (!gameInserted) {
		gameCheck = gameCheck._id;
	}

	var completed = game.totalGamerscore > game.currentGamerscore ? false : true;

	var userGame = {
		lastUnlock: lastPlayed,
		gameId: gameId,
		userId: userId,
		currentGamerscore: game.currentGamerscore,
		earnedAchievements: game.currentAchievements,
		completed: completed
	};
	userGames.upsert({ gameId: gameId, userId: userId }, { $set: userGame });
}

xboxApiPrivate._updateXbox360GameDetails = function(userId, game, gameId) {
	var hexId = game.titleId.toString(16);
	var url = 'game-details-hex/' + hexId;

	try {
		var result = syncApiCaller(url);
	} catch (e) {
		console.log("error in calling the api: " + e.reason);
		return;
	}

	console.log(result.data.Items);

	// if (!result || !result.data || !result.data.Items) {
		var releaseDate = (typeof result.data.Items[0].ReleaseDate !== 'undefined') ? result.data.Items[0].ReleaseDate : result.data.Items[0].Updated;
		releaseDate = new Date(parseInt(releaseDate.substr(6)));
		releaseDate = releaseDate.toISOString();
		var allTimeAverageRating = (typeof result.data.Items[0].AllTimeAverageRating !== 'undefined') ? result.data.Items[0].AllTimeAverageRating : 0;
		var gameDetail = {
			gameName: game.name,
			gameDescription: result.data.Items[0].Description,
			gameReducedDescription: result.data.Items[0].ReducedDescription,
			gameReducedName: result.data.Items[0].ReducedName,
			gameReleaseDate: releaseDate,
			gameId: gameId,
			gameGenre: result.data.Items[0].Genres,
			gameArt: result.data.Items[0].Images,
			gamePublisherName: result.data.Items[0].PublisherName,
			gameParentalRating: result.data.Items[0].ParentalRating, // undefined
			gameAllTimePlayCount: result.data.Items[0].AllTimePlayCount, // undefined
			gameSevenDaysPlayCount: result.data.Items[0].SevenDaysPlayCount, // undefined
			gameThirtyDaysPlayCount: result.data.Items[0].ThirtyDaysPlayCount, // undefined
			gameAllTimeRatingCount: result.data.Items[0].AllTimeRatingCount, // undefined
			gameAllTimeAverageRating: allTimeAverageRating
		};
		console.log(gameDetail);
	// } else {
	// 	var gameDetail = {
	// 		gameName: game.name,
	// 		gameDescription: "This is an ordinary old game.",
	// 		gameReducedDescription: "This is an ordinary old game.",
	// 		gameReducedName: game.name,
	// 		gameReleaseDate: "2005-11-22T00:00:00Z",
	// 		gameId: gameId,
	// 		gameGenre: "Miscellaneous",
	// 		gameArt: "/img/game-default.png",
	// 		gamePublisherName: "Xbox 360",
	// 		gameParentalRating: "Everyone",
	// 		gameAllTimePlayCount: 0,
	// 		gameSevenDaysPlayCount: 0,
	// 		gameThirtyDaysPlayCount: 0,
	// 		gameAllTimeRatingCount: 0,
	// 		gameAllTimeAverageRating: 0
	// 	};
	// 	console.log(gameDetail);
	// }
	gameDetails.upsert({ gameId: gameId }, { $set: gameDetail });
}