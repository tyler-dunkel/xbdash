Template.achievementsSinglePage.created = function() {
	var slug = Router.current().params.slug;
	console.log(slug);
	Meteor.subscribe('singleAchievement', slug);
}

Template.achievementsSinglePage.events({
});

Tracker.autorun(function() {
});