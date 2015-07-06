Template.gamesSinglePage.created = function() {
	var slug = Router.current().params.slug;
	Meteor.subscribe('singleGame', slug);
}

Template.gamesSinglePage.helpers({
	game: function () {
		var slug = Router.current().params.slug;
		var game = xbdGames.findOne({ slug: slug });
		return gameDetails.findOne({ gameId: game._id });
	}
});

Template.gamesSinglePage.events({
});

Tracker.autorun(function() {
});