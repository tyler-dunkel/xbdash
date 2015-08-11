Template.leaderboardsApp.rendered = function() {
}

Template.leaderboardsApp.onCreated(function() {
	this.subscribe('completedAchievements');
});

Template.leaderboardsApp.helpers({
	completedAchievementsLB: function() {
        //var achievements = xbdAchievements.find({}, { sort: { userPercentage: 1 }, limit: 10 });
		return completedAchievements.find({}, { sort: { achievementCount: -1 }, limit: 100 });
        //return userAchievements.find().fetch();
	}
});

Template.leaderboardsApp.events({
});

Tracker.autorun(function() {
});