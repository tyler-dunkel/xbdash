xboxApiObject = xboxApiObject || {};

xboxApiObject.chkGamertag = function(gamertag) {
	var error = false;
	check(gamertag, String);
	var url = 'xuid/' + gamertag;

	try {
		var response = syncApiCaller(url);
		error = null;

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