updateGamercard = function (userId, gamercard) {
	if (!gamercard.gamertag) {
		var error = new Meteor.Error("gamercardScanError", "A problem has occured while scanning the gamertag.");
		return error;
	}
	Meteor.users.upsert({ _id: userId }, { $set: { "profile.gamercard": gamercard } });
	return;
}

updateXboxOneData = function (userId, xboxOneGames) {
	if (!xboxOneGames.titles) {
		var error = new Meteor.Error("xboxOneGamesScanError", "Your Xbox One games can't be scanned at this time.");
		return error;
	}
	Meteor._debug("update Xbox One data");
	xboxOneGames.titles.forEach(function (game) {
		if (game.maxGamerscore ===  0) return;
		var gameId = game.titleId.toString();
		updateXboxOneAchievementsData(userId, gameId);
		updateXboxOneGameData(userId, game, gameId);
		updateXboxOneGameDetails(userId, game, gameId);
	});
}

function updateXboxOneAchievementsData(userId, gameId) {
	var user = Meteor.users.findOne({ _id: userId });
	var url = user.profile.xuid + '/achievements/' + gameId;

	var result = syncApiCaller(url);
	
	var isObject = _.isEmpty(result.data);

	if (isObject) {
		return;
	}

	result.data.forEach(function (achievement) {
		var achievementCheck = xbdAchievements.findOne({ gameId: gameId, name: achievement.name });
		var progressState = (achievement.progressState !== 'NotStarted') ? true : false;
		var progression = achievement.progression.timeUnlocked;
		progression = new Date(progression);
		var achievementInserted = false;
		var achievementValue = achievement.rewards && achievement.rewards.length ? achievement.rewards[0].value : achievement.value;
		if (typeof achievementCheck === 'undefined') {
			var singleAchievement = {
				gameId: gameId,
				name: achievement.name,
				mediaAssets: achievement.mediaAssets[0].url,
				isSecret: achievement.isSecret,
				description: achievement.description,
				lockedDescription: achievement.lockedDescription,
				value: achievementValue
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
}

function updateXboxOneGameData(userId, game, gameId) {
	var gameCheck = xbdGames.findOne({ _id: gameId });
	var lastUnlock = game.lastUnlock;
	lastUnlock = new Date(lastUnlock);
	var gameInserted = false;
	if (typeof gameCheck === 'undefined') {
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
	var userGame = {
		lastUnlock: lastUnlock,
		gameId: gameId,
		userId: userId,
		currentGamerscore: game.currentGamerscore,
		earnedAchievements: game.earnedAchievements
	};
	userGames.upsert({ gameId: gameId, userId: userId }, { $set: userGame });
}

function updateXboxOneGameDetails(userId, game, gameId) {
	var hexId = game.titleId.toString(16);
	var url = 'game-details-hex/' + hexId;
	var result = syncApiCaller(url);

	if (result !== 'undefined') {
		Meteor._debug(game.name);
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
}

updateXbox360Data = function (userId, xbox360Games) {
	if (!xbox360Games.titles) {
		var error = new Meteor.Error("xbox360GamesScanError", "Your Xbox 360 games can't be scanned at this time.");
		return error;
	}
	Meteor._debug("update 360 data");
	xbox360Games.titles.forEach(function (game) {
		if (game.totalGamerscore ===  0) return;
		var gameId = game.titleId.toString();
		updateXbox360AchievementsData(userId, gameId);
		updateXbox360GameData(userId, game, gameId);
		updateXbox360GameDetails(userId, game, gameId);
	});
}

function updateXbox360AchievementsData(userId, gameId) {
	var user = Meteor.users.findOne({ _id: userId });
	var url = user.profile.xuid + '/achievements/' + gameId;

	var result = syncApiCaller(url);

	var isObject = _.isEmpty(result.data);

	if (isObject) {
		return;
	}

	try {
		result.data.forEach(function (achievement) {
			var achievementCheck = xbdAchievements.findOne({ gameId: gameId, name: achievement.name });
			var progressState = (achievement.unlocked !== false) ? true : false;
			var progression = achievement.timeUnlocked;
			progression = new Date(progression);
			var achievementInserted = false;
			var achievementValue = achievement.rewards && achievement.rewards.length ? achievement.rewards[0].value : achievement.value;
			if (typeof achievementCheck === 'undefined') {
				var singleAchievement = {
					gameId: gameId,
					name: achievement.name,
					mediaAssets: achievement.imageUnlocked,
					isSecret: achievement.isSecret,
					description: achievement.description,
					lockedDescription: achievement.lockedDescription,
					value: achievement.gamerscore
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
		Meteor._debug(result.data);
	}
}

function updateXbox360GameData(userId, game, gameId) {
	var gameCheck = xbdGames.findOne({ _id: gameId });
	var lastPlayed = game.lastPlayed;
	lastPlayed = new Date(lastPlayed);
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
	var userGame = {
		lastUnlock: lastPlayed,
		gameId: gameId,
		userId: userId,
		currentGamerscore: game.currentGamerscore,
		earnedAchievements: game.currentAchievements
	};
	userGames.upsert({ gameId: gameId, userId: userId }, { $set: userGame });
}

function updateXbox360GameDetails(userId, game, gameId) {
	var hexId = game.titleId.toString(16);
	var url = 'game-details-hex/' + hexId;
	var result = syncApiCaller(url);

	if (result !== 'undefined') {
		Meteor._debug(game.name);
		if (result.data.Items && result.data.Items[0]) {
			var releaseDate = (typeof result.data.Items[0].ReleaseDate !== 'undefined') ? result.data.Items[0].ReleaseDate : result.data.Items[0].Updated;
			releaseDate = new Date(parseInt(releaseDate.substr(6)));
			releaseDate = releaseDate.toISOString();
			Meteor._debug(releaseDate);

			var allTimeAverageRating = (typeof result.data.Items[0].AllTimeAverageRating !== 'undefined') ? result.data.Items[0].AllTimeAverageRating : 0;

			Meteor._debug(allTimeAverageRating);

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
				gameParentalRating: result.data.Items[0].ParentalRating,
				gameAllTimePlayCount: result.data.Items[0].AllTimePlayCount,
				gameSevenDaysPlayCount: result.data.Items[0].SevenDaysPlayCount,
				gameThirtyDaysPlayCount: result.data.Items[0].ThirtyDaysPlayCount,
				gameAllTimeRatingCount: result.data.Items[0].AllTimeRatingCount,
				gameAllTimeAverageRating: allTimeAverageRating
			};
		} else {
			var gameDetail = {
				gameName: game.name,
				gameDescription: "This is an ordinary old game.",
				gameReducedDescription: "This is an ordinary old game.",
				gameReducedName: game.name,
				gameReleaseDate: "2005-11-22T00:00:00Z",
				gameId: gameId,
				gameGenre: "Miscellaneous",
				gameArt: "/public/img/game-default.png",
				gamePublisherName: "Xbox 360",
				gameParentalRating: "Everyone",
				gameAllTimePlayCount: 0,
				gameSevenDaysPlayCount: 0,
				gameThirtyDaysPlayCount: 0,
				gameAllTimeRatingCount: 0,
				gameAllTimeAverageRating: 0
			};
		}
		gameDetails.upsert({ gameId: gameId }, { $set: gameDetail });
	}
}