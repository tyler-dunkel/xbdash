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