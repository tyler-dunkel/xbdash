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
		return user.gamercard.gamertag;
	},
	getUserImage: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	},
	getGamerscore: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.gamercard.gamerscore;
	}
});