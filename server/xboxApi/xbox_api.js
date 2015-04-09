function xboxApiCaller (url, callback) {
	// https://xboxapi.com/v2/xuid/djekl
	// https://xboxapi.com/v2/gamertag/2533274805933072
	HTTP.get('https://xboxapi.com/v2' + url, {headers: { 'X-AUTH' : '552ff8542ffd7c1f984b7fbf06462f10f659ae20' }}, function (error, result){
		rateLimitRemaining = result.headers['x-ratelimit-remaining'];
		if (rateLimitRemaining) {
			Meteor._debug('Getting ' + rateLimitRemaining);
		}
		callback(null, result);
	});
};

var wrapApiCaller = Async.wrap(xboxApiCaller);

Meteor.methods({
	chkGamertag: function(gamertag) {
		//Meteor._debug(gamertag);

		var url = '/xuid/' + gamertag;
		var response = wrapApiCaller(url);

		//Meteor._debug(response);
		return response.content;
	}
});