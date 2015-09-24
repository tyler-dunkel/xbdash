Template.overallRanks.created = function() {
	this.subscribe('overallRanks');
}

Template.overallRanks.helpers({
	overallLB: function() {
		return userLeaderboards.find({}, {
			sort: { overallRank: 1 },
			limit: 100
		});
	},
	getUser: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.profile.gamercard.gamertag;
	},
	getUserImage: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (user.profile.gamercard.gamerpicLargeSslImagePath) {
			return user.profile.gamercard.gamerpicLargeSslImagePath;
		}
		return '/img/gamerpic-default.jpg';
	},
	getGamerscore: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.profile.gamercard.gamerscore;
	}
});