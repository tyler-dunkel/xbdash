updateGamercard = function (userId, gamercard) {
	if (!gamercard.gamertag) {
		var error = new Meteor.Error("gamercardScanError", "A problem has occured while scanning the gamertag.");
		return error;
	}
	Meteor.users.upsert({_id: userId}, {$set: {"profile.gamercard": gamercard }});
	return;
}

updateXboxOneData = function (userId, xboxOneGames) {
	if (!xboxOneGames.titles) {
		var error = new Meteor.Error("xboxOneGamesScanError", "The Xbox One games can't be scanned at this time.");
		return error;
	}
	xboxOneGames.titles.forEach(function (game) {
		if (game.maxGamerscore ===  0) return;
		var gameId = game.titleId.toString();
		updateXboxOneAchievementsData(userId, gameId);
		updateXboxOneGameData(userId, game, gameId);
		updateXboxOneGameDetails(userId, game, gameId);
	});
}

function updateXboxOneAchievementsData(userId, gameId) {
	var user = Meteor.users.findOne({_id: userId});
	var url = user.profile.xuid + '/achievements/' + gameId;

	var result = syncApiCaller(url);

	if (!result.data.constructor === Array) { return; }

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
		 userAchievements.upsert({ achievementId: achievementCheck, userId: userId },
		  { $set: userAchievement });
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

//updateXboxXenonAchievementsData;
//updateXboxXenonGameData
//updateXboxXenonGameDetails