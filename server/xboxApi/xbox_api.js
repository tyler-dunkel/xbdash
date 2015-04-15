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

		var url = 'xuid/' + gamertag;
		var response = syncApiCaller(url);

		var xuid = response.content;
		var userExists = Meteor.users.findOne({"profile.xuid": xuid});

		if ( response.statusCode === 200 || response.statusCode === 201 ) {
			if (userExists) {
				throw new Meteor.Error("gamertagExists", "Gamertag is already registered", "This gamertag has already been registered. If you are sure this is your gamertag, please contact us at <a href='mailto:support@xboxdash.com' style='color: #0000dd'>support@xboxdash.com</a>!");
			} else {
				Meteor._debug("200 fired and returned content");
				return {content: response.content, statusCode: response.statusCode};
			}
		} else {
			throw new Meteor.Error("gamertagNotFound", "Gamertag Not Found", "If you are sure you entered the correct gamertag, please contact us at <a href='mailto:support@xboxdash.com' style='color: #0000dd'>support@xboxdash.com</a>!");
		}
	},
	retrieveData: function(user) {
		//Meteor._debug(user);
		[
		'gamercard',
		'xboxonegames'
		].forEach(function(i) {
			var userId = Meteor.userId();
			var setObject = { $set: {} };

			if (i === 'gamercard') {
				var url = user.profile.xuid + '/' + i;
				var result = syncApiCaller(url);
				setObject.$set['profile.' + i] = result.data;
				Meteor.users.upsert(userId, setObject);
				//Meteor._debug(result.data);
			}

			if (i === 'xboxonegames') {
				//Meteor._debug("this is xboxonegames");
				var url2 = user.profile.xuid + '/achievements/' + i.titleId;
				var result2 = syncApiCaller(url2);
				setObject.$set[i] = result2.data;
				Meteor._debug(result2.data);
				
				//result2.data.forEach(function(j) {
					//j.titleName = i.name;
					//Meteor._debug("logging achievement " + result2.data.titleName);
					/*
					xbdAchievements.upsert({
						id: i.id,
						//xuid: xuid, 
						titleId: i.name
					}, setObject);
				//});

				/*

                    res.data.forEach(function (j) {
                        var id = j.id;
                        delete j.id;
                        j.titleName = i.name;
                        xbdAchievements.upsert({ id: id, xuid: xuid, titleId: i.titleId }, { $set: j });
                    });

                var gameId = i.titleId.toString(16);
                if (!XBDCGames.findOne({ gameId: gameId })) {
                    xbdcParseQueue.push(['/v2/game-details-hex/' + gameId, function (err, res) { // 19 > titleId from 16 converted to HEX (.toString(16))
                        XBDCGames.upsert({ gameId: gameId }, { $set: res.data.Items[0] });
                    }]);
                }
                */

			}
		});
		return "hello world";
	}
});

// https://xboxapi.com/v2/xuid/djekl
// https://xboxapi.com/v2/gamertag/2533274805933072