Template.achievementsPage.rendered = function() {
}

Template.achievementsApp.onCreated(function() {
	var limit = 20;
	this.subscribe('mostPopularAchievements');
	this.subscribe('rarestAchievements');
});

Template.achievementsApp.helpers({
	mostPopularAchievements: function() {
		var achievements = xbdAchievements.find({}, {sort: {userPercentage: 1}, limit: 12});
		return achievements;
	},
	rarestAchievements: function() {
		var achievements = xbdAchievements.find({}, {sort: {userPercentage: -1}, limit: 12});
		return achievements;
	}
});

Template.achievementsPage.events({
});

Tracker.autorun(function() {
});