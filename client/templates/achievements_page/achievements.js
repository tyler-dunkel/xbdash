Template.achievementsApp.created = function() {
	var limit = 20;
	this.subscribe('mostPopularAchievements');
	this.subscribe('rarestAchievements');
}

Template.achievementsApp.rendered = function() {
	$('[data-toggle="tooltip"]').tooltip();
}

Template.achievementsApp.events({
	"click .common-button": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=common' });
	},
	"click .rare-button": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=rare' });
	},
	"click .epic-button": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=epic' });
	},
	"click .legendary-button": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=legendary' });
	}
});

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

Template.achievementsPage.helpers({
	showMore: function() {
		var options = Router.current().params.query;
		console.log(options);
		if (_.isEmpty(options)) {
			return false;
		}
		return true;
	}
});