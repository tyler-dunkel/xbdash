Template.leaderboardsApp.rendered = function() {
}

Template.leaderboardsApp.onCreated(function() {
	this.subscribe('achievementsCompletedLB');
});

Template.leaderboardsApp.helpers({
	achievementsCompletedLB: function() {
        //var achievements = xbdAchievements.find({}, { sort: { userPercentage: 1 }, limit: 10 });
		return userAchievements.find({}, { sort: { progressState: 1 }, limit: 100 });
        //return userAchievements.find().fetch();
	}
});

Template.leaderboardsApp.events({
});

Tracker.autorun(function() {
});