function xboxApiCaller (url, callback) {
	try {
		HTTP.get('https://xboxapi.com/v2/' + url, {headers: { 'X-AUTH' : 'REPLACEME' }}, function (error, result) {
			if (!error) {
				var rateLimitRemaining = result.headers['x-ratelimit-remaining'];
				if (rateLimitRemaining > 0) {
					//Meteor._debug("rate limit is more than 0");
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