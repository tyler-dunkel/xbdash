Template.gamesSinglePage.created = function() {
	//var slug = Router.current().params.slug;
	//Meteor.subscribe('singleGame', slug);
}

Template.gamesSinglePage.helpers({
	game: function () {
		var slug = Router.current().params.slug;
		return xbdGames.findOne({ slug: slug });
	}
});

Template.gamesSinglePage.events({
});

Tracker.autorun(function() {
});