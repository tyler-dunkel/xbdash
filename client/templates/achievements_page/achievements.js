Template.achievementsApp.created = function() {
	var limit = 20;
	this.subscribe('mostPopularAchievements');
	this.subscribe('rarestAchievements');
}

Template.achievementsApp.rendered = function() {
	$('[data-toggle="tooltip"]').tooltip();
}

Template.achievementsApp.helpers({
	mostPopularAchievements: function() {
		var achievements = xbdAchievements.find({}, { sort: { userPercentage: -1 }, limit: 10 });
		return achievements;
	},
	rarestAchievements: function() {
		var achievements = xbdAchievements.find({}, { sort: { userPercentage: 1 }, limit: 10 });
		return achievements;
	}
});

Template.achievementsPage.events({
});

Tracker.autorun(function() {
});