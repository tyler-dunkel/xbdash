function xboxApiCaller (url, callback) {
	HTTP.get('https://xboxapi.com/v2/' + url, {headers: { 'X-AUTH' : '552ff8542ffd7c1f984b7fbf06462f10f659ae20' }}, function (error, result){
		rateLimitRemaining = result.headers['x-ratelimit-remaining'];
		if (rateLimitRemaining) {
			Meteor._debug('Calls Left: ' + rateLimitRemaining);
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

		Meteor._debug(response.statusCode);
		//return {content: response.content, statusCode: response.statusCode};

		switch(response.statusCode) {
			case 200:
				return {content: response.content};
				break;
			case 201:
				return {content: response.content};
				break;
			default:
				throw new Meteor.Error("ServerError", "The server cannot be reached.");
				return;
		}


	},
	retrieveData: function(user) {
		//Meteor._debug(user);
		[
		'gamercard',
		'xboxonegames'
		].forEach(function(i) {
			var url = user.profile.xuid + '/' + i;
			var result = syncApiCaller(url);
			var userId = Meteor.userId();
			var setObject = { $set: {} };

			if (i === 'gamercard') {
				setObject.$set['profile.' + i] = result.data;
				Meteor.users.upsert(userId, setObject);
				Meteor._debug(result.data);
			}

			if (i === 'xboxonegames') {
				Meteor._debug("this is xboxonegames");
				result.data.titles.forEach(function(i) {
					var url = user.profile.xuid + '/achievements/' + i.titleId;
					var result = syncApiCaller(url);
					Meteor._debug(result);
				});
			}

			//Meteor._debug(result.data.gamertag);
			/*Meteor.users.upsert(userId, {
				$set: {
					profile: {
						gamertag: result.data.gamertag,
						name: result.data.name,
						location: result.data.location,
						bio: result.data.bio,
						gamerscore: result.data.gamerscore
					}
				}
			});
			*/

			//Meteor._debug(url);
			//Meteor._debug(result);

		});
		return "hello world";
	}
});

// https://xboxapi.com/v2/xuid/djekl
// https://xboxapi.com/v2/gamertag/2533274805933072