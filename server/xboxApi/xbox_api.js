Meteor.methods({
	chkGamertag: function(gamertag) {
		check(gamertag, String);
		var userId = Meteor.userId();
		var userGamertagExists = Meteor.users.findOne({ "gamercard.gamertag": gamertag });
		var apiResult = xboxApiObject.chkGamertag(gamertag);
		var userXuidExists = Meteor.users.findOne({ xuid: apiResult.result.content });

		if (userGamertagExists) {
			throw new Meteor.Error("gamertagExists", "Gamertag is already registered.");
		}
		
		if (apiResult.error) {
			throw new Meteor.Error("gamertagNotFound", apiResult.error.reason);
		}

		if (!apiResult.result || !apiResult.result.content) {
			throw new Meteor.Error("internalServerError", "There was an error fetching your data.");
		}

		if (userXuidExists) {
			throw new Meteor.Error("gamertagExists", "Gamertag is owned");
		}

		Meteor.users.update({ _id: userId }, { $set: { username: gamertag, xuid: apiResult.result.content } });

		return {
			content: apiResult.result.content,
			statusCode: apiResult.result.statusCode
		};
	},
	retrieveData: function() {
		this.unblock();
		
		var userId = Meteor.userId();

		Meteor.users.update({ _id: userId }, { $set: { 'gamertagScanned.status': 'building' } });

		xboxApiObject.updateGamercard(userId);
		xboxApiObject.updateXboxOneGames(userId);
		xboxApiObject.updateXbox360Data(userId);

		Meteor.users.update({ _id: userId }, { $set: { 'gamertagScanned.status': 'true', 'gamertagScanned.lastUpdate': new Date() } });

		Meteor.call('sendWelcomeEmail', userId, function(error) {
			if (error) {
				console.log(error);
				console.log('send welcome email error');
			}
		});

		return "hello world";
	}
});

	