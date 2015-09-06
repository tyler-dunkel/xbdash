Template.achievementsApp.created = function() {
	var limit = 20;
	this.subscribe('mostPopularAchievements');
	this.subscribe('rarestAchievements');
}

Template.achievementsApp.rendered = function() {
}

Template.achievementsApp.helpers({
	commonUsers: function() {
		var users = Meteor.users.find().count();
		var achievement = xbdAchievements.findOne({ "userPercentage": { $gte: 61 } }, { fields: { userPercentage: 1 } });
		if (typeof achievement !== 'undefined' && achievement.userPercentage >= 61) {
			var userPercentage = achievement.userPercentage;
			var userCount = (users * userPercentage) / 100;
			return numberFormatter(userCount);
		}
		return '--';
	},
	rareUsers: function() {
		var users = Meteor.users.find().count();
		var achievement = xbdAchievements.findOne({ "userPercentage": { $gte: 31, $lte: 60 } }, { fields: { userPercentage: 1 } });
		if (typeof achievement !== 'undefined' && achievement.userPercentage >= 61) {
			var userPercentage = achievement.userPercentage;
			var userCount = (users * userPercentage) / 100;
			return numberFormatter(userCount);
		}
		return '--';
	},
	epicUsers: function() {
		var users = Meteor.users.find().count();
		var achievement = xbdAchievements.findOne({ "userPercentage": { $gte: 11, $lte: 30 } }, { fields: { userPercentage: 1 } });
		if (typeof achievement !== 'undefined' && achievement.userPercentage >= 61) {
			var userPercentage = achievement.userPercentage;
			var userCount = (users * userPercentage) / 100;
			return numberFormatter(userCount);
		}
		return '--';
	},
	legendaryUsers: function() {
		var users = Meteor.users.find().count();
		var achievement = xbdAchievements.findOne({ "userPercentage": { $lte: 10 } }, { fields: { userPercentage: 1 } });
		if (typeof achievement !== 'undefined' && achievement.userPercentage >= 61) {
			var userPercentage = achievement.userPercentage;
			var userCount = (users * userPercentage) / 100;
			return numberFormatter(userCount);
		}
		return '--';	
	},
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