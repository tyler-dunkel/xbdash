Template.contestLeaderboardTemplate.helpers({
	checkCurrentUserForLB: function() {
		var user = Meteor.user();
		var count = userContestEntries.find({ 'userId': user._id, 'data.value': { $gte: 1 } }).count();
		console.log('checkForLB ' + count);
		if (count > 0) return true;
		return false;
	},
	defaultContestBoardText: function() {
		return "Waiting for user referrals";
	},
	checkForLB: function() {
		var count = userContestEntries.find({ 'status': 'active', 'data.value': { $gte: 1 } }).count();
		console.log('checkForLB 2 ' + count);
		if (count > 0) return true;
		return false;
	},
	rank: function() {
		var entry = userContestEntries.find({
				'status': 'active',
				'data.value': { $gte: 1 }
			}, {
				sort: { 'data.value': -1 },
				limit: 10
			});
		return entry;
	},
	getUser: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		console.log('entry user ' + user);
		if (user && user.gamercard) {
			return user.gamercard.gamertag;
		}
	},
	getUserImage: function() {
		var entryUser = userContestEntries.findOne({ 'userId': this.userId });
		var user = Meteor.users.findOne({ _id: entryUser.userId });
		console.log('entry2 user ' + user);
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath && (user.gamercard.gamerpicLargeSslImagePath !== '')) {
			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	},
	getUserReferralCount: function() {
		var entry = userContestEntries.findOne({ 'userId': this.userId });
		console.log('user referral count ' + entry);
		if (entry && entry.data) {
			console.log('user referral count2 ' + entry.data.value);
			return entry.data.value;
		}
		return '--';
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