Template.contestLeaderboardTemplate.helpers({
	// checkCurrentUserForLB: function() {
	// 	var user = Meteor.user();
	// 	var count = userContestEntries.find({ 'userId': user._id, 'data.value': { $gte: 1 } }).count();
	// 	if (count > 0) return true;
	// 	return false;
	// },
	// defaultContestBoardText: function() {
	// 	return "Waiting for user referrals";
	// },
	checkForLB: function() {
		var count = userContestEntries.find({ 'status': 'active', 'data.value': { $gte: 1 } }).count();
		if (count > 0) return true;
		return false;
	},
	contestEntry: function() {
		return userContestEntries.find({
				'status': 'active',
				'data.value': { $gte: 1 }
			});
	},
	chkCurrentUser: function() {
		var user = Meteor.user();
		if (user._id == this.userId) return true;
		return false;
	},
	getUser: function() {
		var userGamertag;
		var user = Meteor.users.findOne({ _id: this.userId });
		if (user && user.gamercard) {
			userGamertag = user.gamercard.gamertag;
		}
		if (user && user.xboxProfile) {
			userGamertag = user.xboxProfile.gamertag;
		}
		return userGamertag;
	},
	getUserImage: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath && (user.gamercard.gamerpicLargeSslImagePath !== '')) {
			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	},
	getUserReferralCount: function() {
		return this.data.value;
	}
});

Template.contestLeaderboardTemplate.events({
	'click .profile-link': function(e) {
		e.preventDefault();
		var user = Meteor.users.findOne({ _id: this.userId });
		Router.go('userPage', { gamertagSlug: user.gamertagSlug });
	}
});

// Template.currentUserContestLeaderboard.helpers({
// 	getCurrentUser: function() {
// 		var user = Meteor.user();
// 		return user.gamercard.gamertag;
// 	},
// 	getCurrentUserImage: function() {
// 		var user = Meteor.user();
// 		var defaultGamerImage = '/img/gamerpic-default.jpg';
// 		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
// 			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
// 		}
// 		return defaultGamerImage;
// 	},
// 	getCurrentUserReferralCount: function() {
// 		var user = Meteor.user();
// 		var entry = userContestEntries.findOne({ 'userId': user._id });
// 		if (entry && entry.data) {
// 			return entry.data.value;
// 		}
// 		return '--';
// 	}
// });