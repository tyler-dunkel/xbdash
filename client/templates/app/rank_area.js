Template.userDailyRank.created = function() {
	this.subscribe('dailyRanks');
}

Template.userDailyRank.helpers({
	userDailyRank: function() {
		var userId = Meteor.userId();
		var userStat = userLeaderboards.findOne({ userId: userId });
		if (userStat && userStat.dailyRank && userStat.dailyRank.rank > 0) {
			return userStat.dailyRank.rank;
		}
		return '---';
	}
});

Template.userOverallRank.created = function() {
	this.subscribe('overallRanks');
}

Template.userOverallRank.helpers({
	userOverallRank: function() {
		var userId = Meteor.userId();
		var userStat = userLeaderboards.findOne({ userId: userId });
		if (userStat && userStat.overallRank > 0) {
			return userStat.overallRank;
		}
		return '---';
	}
});