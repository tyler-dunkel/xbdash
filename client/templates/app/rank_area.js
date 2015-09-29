Template.userDailyRank.created = function() {
	this.subscribe('dailyRanks');
}

Template.userOverallRank.created = function() {
	this.subscribe('overallRanks');
}

Template.userDailyRank.helpers({
	userDailyRank: function() {
		var userId = Meteor.userId();
		var userStat = userLeaderboards.findOne({ userId: userId });
		if (userStat && userStat.dailyRank.rank > 0) {
			return userStat.dailyRank.rank;
		}
		return '---';
	}
});

Template.userOverallRank.helpers({
	userOverallRank: function() {
		var userId = Meteor.userId();
		var userStat = userLeaderboards.findOne({ userId: userId });
		if (userStat && userStat.overallRank) {
			return userStat.overallRank;
		}
		return '---';
	}
});