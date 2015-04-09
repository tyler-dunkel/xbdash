function xboxApiCaller (url, callback) {
	HTTP.get('https://xboxapi.com/v2/' + url, {headers: { 'X-AUTH' : '552ff8542ffd7c1f984b7fbf06462f10f659ae20' }}, function (error, result){
		rateLimitRemaining = result.headers['x-ratelimit-remaining'];
		if (rateLimitRemaining) {
			Meteor._debug('Getting ' + rateLimitRemaining);
		}
		callback(null, result);
	});
};

var syncApiCaller = Async.wrap(xboxApiCaller);

Meteor.methods({
	chkGamertag: function(gamertag) {
		//Meteor._debug(gamertag);

		var url = 'xuid/' + gamertag;
		var response = syncApiCaller(url);

		Meteor._debug(response);
		return {content: response.content, statusCode: response.statusCode};
	},
	retrieveData: function(user) {
		Meteor._debug(user);
		[
		'gamercard'
		].forEach(function(i) {
			var url = user.profile.xuid + '/' + i;
			//Meteor._debug(url);
			var result = syncApiCaller(url);
			//Meteor._debug(result);
		});
		return "hello world";
	}
});







// https://xboxapi.com/v2/xuid/djekl
// https://xboxapi.com/v2/gamertag/2533274805933072