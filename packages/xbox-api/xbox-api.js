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
		console.log(error);
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
	var user = Meteor.users.findOne({ _id: userId }, { $exists: { xuid: 1 } });
	
	if (!user || !user.xuid) {
	}
	
	var url = user.xuid + '/xboxonegames';

	try {
		var response = syncApiCaller(url);
	} catch (e) {
		return;
	}

	if (!response || !response.data || !response.data.titles) {
		return;
	}

	response.data.titles.forEach(function (game) {
		if (game.maxGamerscore ===  0) return;
		
		var gameId = game.titleId.toString();

		xboxApiPrivate._updateXboxOneAchievementsData(userId, gameId);
		xboxApiPrivate._updateXboxOneGameData(userId, game, gameId);
		xboxApiPrivate._updateXboxOneGameDetails(userId, game, gameId);
	});
}

xboxApiObject.updateXbox360Data = function(userId) {
	check(userId, String);
	var user = Meteor.users.findOne({ _id: userId }, { $exists: { xuid: 1 } });
	
	if (!user || !user.xuid) {
	}
	
	var url = user.xuid + '/xbox360games';

	try {
		var response = syncApiCaller(url);
	} catch (e) {
	}

	if (!response || !response.data || !response.data.titles) {
		return;
	}

	response.data.titles.forEach(function (game) {
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

xboxApiObject.updateUserStats = function(userId) {
	var user = Meteor.users.findOne(userId);
	
	if (!user || !user.gamertagScanned || !user.gamertagScanned.status || user.gamertagScanned.status === 'building') return;

	Meteor.users.update({ _id: userId }, { $set: { 'gamertagScanned.status': 'updating' } });

	this.updateXboxOneGames(userId);
	this.updateXbox360Data(userId);
	
	Meteor.users.update({ _id: userId }, { $set: { 'gamertagScanned.status': 'true', 'gamertagScanned.lastUpdate': new Date() } });
}

xboxApiObject.dirtyUpdateUserStats = function(userId) {
	var user = Meteor.users.findOne(userId);

	if (!user || !user.gamertagScanned || !user.gamertagScanned.status === 'true') return;

	var url = user.xuid + '/gamercard';

	try {
		var result = syncApiCaller(url);
	} catch(e) {
		var error = 'there was a problem calling the xbox api';
	}

	if (error) {
		return;
	}

	if (result.data && result.data.gamerscore) {
		if (user.gamercard.gamerscore < result.data.gamerscore) {
			console.log('the gamerscore on record is lower than on the api');
			Meteor.users.update({ _id: userId }, { $set: { 'gamertagScanned.status': 'updating' } });
			Meteor.users.update({ _id: user._id }, { $set: { gamercard: result.data }});
			xboxApiPrivate._dirtyCheckXboxOneGames(user);
			xboxApiPrivate._dirtyCheckXbox360Games(user);
			Meteor.users.update({ _id: userId }, { $set: { 'gamertagScanned.status': 'true', 'gamertagScanned.lastUpdate': new Date() } });
			return;
		}
		if (user.xboxProfile.gamerscore < result.data.gamerscore) {
			console.log('the gamerscore on record is lower than on the api');
			Meteor.users.update({ _id: userId }, { $set: { 'gamertagScanned.status': 'updating' } });
			Meteor.users.update({ _id: user._id }, { $set: { gamercard: result.data }});
			xboxApiPrivate._dirtyCheckXboxOneGames(user);
			xboxApiPrivate._dirtyCheckXbox360Games(user);
			Meteor.users.update({ _id: userId }, { $set: { 'gamertagScanned.status': 'true', 'gamertagScanned.lastUpdate': new Date() } });
			return;
		}
	}
}