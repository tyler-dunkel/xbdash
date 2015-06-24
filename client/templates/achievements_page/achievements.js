Template.achievementsPage.rendered = function() {
}

Template.achievementsApp.onCreated(function() {
	var limit = 20;
	this.subscribe('rarestAchievements');
	this.subscribe('mostPopularAchievements')
});

Template.achievementsApp.helpers({
	rarestAchievements: function() {
		var achievements = xbdAchievements.find({}, {sort: {userPercentage: -1}, limit: 12});
		return achievements;
	},
	mostPopularAchievements: function() {
		var achievements = xbdAchievements.find({}, {sort: {userPercentage: 1}, limit: 12});
		return achievements;
	}
});

Template.achievementsPage.events({
});

Tracker.autorun(function() {
});