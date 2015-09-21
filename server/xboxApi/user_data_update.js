Meteor.startup(function() {
	Meteor.setInterval(function() {
		var users = Meteor.users.find({"status.online": true});
		Meteor._debug("user function firing");
		if (!users.count()) {
			Meteor._debug("there are no users online currently");
			return;
		}
		users.forEach(function(user) {
			checkUserForUpdates(user._id);
		});
	}, 1800000);
	//}, 10000);
});

function checkUserForUpdates(userId) {
	var user = Meteor.users.findOne(userId);
	if (typeof user.profile.gamercard == 'undefined') {
		Meteor._debug('gamercard not present, not signed up');
		return;
	}
	var url = user.profile.xuid + '/gamercard';
	var result = syncApiCaller(url);
	if (result.data && result.data.gamerscore) {
		if (user.profile.gamerscore < result.data.gamerscore) {
			Meteor.users.update({_id: user._id}, {$set: {'profile.gamercard': result.data } });
			checkUserGamesListDurango(user._id, user.profile.xuid, true);
			checkUserGamesListXenon(user._id, user.profile.xuid, true);
		}
		checkUserGamesListDurango(user._id, user.profile.xuid, false);
		checkUserGamesListXenon(user._id, user.profile.xuid, false);
		leaderboardsApi.updateUserRanks(userId);
		Meteor._debug("updated leaderboards");
	}
	//var userGamesCount = userGames.find({userId: userId}).count();
}

function checkUserGamesListDurango(userId, userXuid, gamerscoreCheck) {
	var url = userXuid + '/xboxonegames';
	var result = syncApiCaller(url);
	if (result.data && result.data.titles) {
		var userGamesList = userGames.find({userId: userId});
		//create an array, push only xboxOne games into it and then count it
		var userGamesCount = [];
		userGamesList.forEach(function(userGame) {
			var xbdGame = xbdGames.findOne({_id: userGame.gameId});
			if (xbdGame.platform === 'Durango') {
				userGamesCount.push(userGame);
			}
		});
		if (result.data.titles.length > userGamesCount) {
			Meteor._debug('updating xbox one games');
			updateXboxOneData(userId, result.data);
			return;
		}
		if (gamerscoreCheck) {
			updateXboxOneData(userId, result.data);
			return;
		}
		Meteor._debug('nothing to update for: ' + userId);
		return;

	}
	Meteor._debug('api problem in Durango check function');
	return;
}

function checkUserGamesListXenon(userId, userXuid, gamerscoreCheck) {
	var url = userXuid + '/xbox360games';
	var result = syncApiCaller(url);
	if (result.data && result.data.titles) {
		var userGamesList = userGames.find({userId: userId});
		//create an array, push only xboxOne games into it and then count it
		var userGamesCount = [];
		userGamesList.forEach(function(userGame) {
			var xbdGame = xbdGames.findOne({_id: userGame.gameId});
			if (xbdGame.platform === 'Xenon') {
				userGamesCount.push(userGame);
			}
		});
		if (result.data.titles.length > userGamesCount) {
			Meteor._debug('updating xbox 360 games');
			updateXbox360Data(userId, result.data);
			return;
		}
		if (gamerscoreCheck) {
			updateXbox360Data(userId, result.data);
			return;
		}
		Meteor._debug('nothing to update for: ' + userId);
		return;

	}
	Meteor._debug('api problem in Xenon check function');
	return;
}

// function updateUserData(userId) {
// 	//Meteor._debug(userId);
// 	var user = Meteor.users.findOne(userId);
// 	//Meteor._debug(user);
// 	if (typeof user.profile.gamercard !== 'undefined') {
// 		Meteor._debug("fires when gamercard is present");

// 		var url = user.profile.xuid + '/gamercard';
// 		var result = syncApiCaller(url);
// 		//Meteor._debug(result);

// 		if (user.profile.gamercard.gamerscore < result.data.gamerscore) {
// 			Meteor._debug("gamerscore");
// 			Meteor.users.upsert({ _id: user._id }, { $set: { 'profile.gamercard': result.data } });
// 			userUpdater(user);
// 		}
// 	} else { return; }
// }