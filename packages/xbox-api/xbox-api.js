xboxApiObject = xboxApiObject || {};

xboxApiObject.chkGamertag = function(gamertag) {
	var error = false;
	check(gamertag, String);
	var url = 'xuid/' + gamertag;

	try {
		var response = syncApiCaller(url);
	} catch (e) {
		error = {
			reason: e.reason,
			details: e.details
		};
		console.log("this is the error catch block");
	}

	if (error) {
		return {
			result: null,
			error: error
		};
	}

	return {
		result: response,
		error: null
	};
}

xboxApiObject.updateXboxOneGames = function(userId) {
	check(userId, String);
	var user = Meteor.users.findOne({_id: userId}, {$exists: { xuid: 1 } });
	if (!user || !user.xuid) {
		console.log("error, userId param has not returned a record. either no user or a user without an xuid");
	}
	var url = user.xuid + '/xboxonegames';

	try {
		var response = syncApiCaller(url);
	} catch (e) {
		console.log("error with api while scanning xbox one games: " + e.reason);
		return;
	}
	if (!response || !response.data || !response.data.titles) {
		console.log("error, no data for xbox one: " + response);
		return;
	}
	response.data.titles.forEach(function (game) {

		//this will return and not insert apps like netflix into the database as games
		if (game.maxGamerscore ===  0) return;

		var gameId = game.titleId.toString();
		xboxApiPrivate._updateXboxOneAchievementsData(userId, gameId);
		xboxApiPrivate._updateXboxOneGameData(userId, game, gameId);
		xboxApiPrivate._updateXboxOneGameDetails(userId, game, gameId);
	});
}

xboxApiObject.updateXbox360Data = function(userId) {
	check(userId, String);
	var user = Meteor.users.findOne({_id: userId}, {$exists: { xuid: 1 } });
	if (!user || !user.xuid) {
		console.log("error, userId param has not returned a record. either no user or a user without an xuid");
	}
	var url = user.xuid + '/xbox360games';

	try {
		var response = syncApiCaller(url);
	} catch (e) {
		console.log("error with api while scanning 360 games" + error.reason);
	}

	if (!response || !response.data || !response.data.titles) {
		console.log("error, no data for 360: " + response);
		return;
	}

	response.data.titles.forEach(function (game) {
		//return if game is an app and has 0 gamerscore (netflix)
		if (game.totalGamerscore ===  0) return;
		var gameId = game.titleId.toString();
		xboxApiPrivate._updateXbox360AchievementsData(userId, gameId);
		xboxApiPrivate._updateXbox360GameData(userId, game, gameId);
		xboxApiPrivate._updateXbox360GameDetails(userId, game, gameId);
	});
}

xboxApiObject.updateGamercard = function(userId) {
	var error = false;
	check(userId, String);
	var user = Meteor.users.findOne({ _id: userId }, { $exists: { xuid: 1 } });

	if (!user) {
		error = {
			reason: "User doesn't have an xuid.",
			details: "Scanned the userId, and user's xuid is missing."
		};
		return {
			result: null,
			error: error
		};
	}

	var url = user.xuid + '/gamercard';

	try {
		var response = syncApiCaller(url);
	} catch (e) {
		error = {
			reason: e.reason,
			details: e.details
		};
	}

	if (error) {
		return {
			result: null,
			error: error
		}
	}

	Meteor.users.update({ _id: userId }, { $set: { gamercard: response.data } });

	return {
		error: null
	};
}