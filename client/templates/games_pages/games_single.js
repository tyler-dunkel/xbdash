Template.gamesSinglePage.created = function() {
	var id = Router.current().params._id;
	console.log(id);
	this.subscribe('singleGame', id);
}

Template.gamesSinglePage.helpers({
	game: function() {
		var id = Router.current().params._id;
		return gameDetails.findOne({_id: id});
	}
});

Template.gamesSinglePage.events({
});

Tracker.autorun(function() {
});