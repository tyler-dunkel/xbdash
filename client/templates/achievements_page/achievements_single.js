Template.achievementsSinglePage.created = function() {
	var slug = Router.current().params.slug;
	console.log(slug);
	Meteor.subscribe('singleAchievement', slug);
}

Template.achievementsSinglePage.helpers({
	achievement: function() {
		var slug = Router.current().params.slug;
		return xbdAchievements.findOne({slug: slug});
	}
});

Template.achievementsSinglePage.events({
});

Tracker.autorun(function() {
});