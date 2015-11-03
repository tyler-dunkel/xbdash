Meteor.methods({
	chkGamertag: function(gamertag) {
		check(gamertag, String);

		var userId = Meteor.userId();

		var userExists = Meteor.users.findOne({ "gamercard.gamertag": gamertag });
		if (userExists) {
			throw new Meteor.Error("gamertagExists", "Gamertag is already registered.");
		}

		var apiResult = xboxApiObject.chkGamertag(gamertag);
		if (apiResult.error) {
			throw new Meteor.Error("gamertagNotFound", apiResult.error.reason);
		}

		Meteor.users.update({ _id: userId }, { $set: { username: gamertag, xuid: apiResult.result.content } });

		return {
			content: apiResult.result.content,
			statusCode: apiResult.result.statusCode
		};
	},
	retrieveData: function() {
		var userId = Meteor.userId();
		var user = Meteor.users.findOne({ _id: userId });

		Meteor.users.update({ _id: userId }, { $set: { gamertagScanned: true } });

		xboxApiObject.updateGamercard(userId);
		xboxApiObject.updateXboxOneGames(userId);
		xboxApiObject.updateXbox360Data(userId);

		return "hello world";
	}
});

	