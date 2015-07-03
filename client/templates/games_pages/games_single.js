Template.gamesSinglePage.created = function() {
	var id = Router.current().params._id;
	console.log(id);
	this.subscribe('singleGame', id);
}

Template.gamesSinglePage.events({
});

Tracker.autorun(function() {
});