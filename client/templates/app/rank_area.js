Template.userDailyRank.created = function() {
	this.subscribe('currentUserLeaderboard');
}

Template.userDailyRank.helpers({
	userDailyRank: function() {
        var user = Meteor.user();
        var userLb = userLeaderboards.findOne({ userId: user._id });
        if (userLb && userLb.dailyRank && userLb.dailyRank.rank > 0) {
        	return userLb.dailyRank.rank;
        }
        return '---';
    }
});

Template.userOverallRank.created = function() {
	this.subscribe('currentUserLeaderboard');
}

Template.userOverallRank.helpers({
	userOverallRank: function() {
        var user = Meteor.user();
        var userLb = userLeaderboards.findOne({ userId: user._id });
        if (userLb && userLb.overallRank > 0) {
        	return userLb.overallRank;
        }
        return '---';
    }
});