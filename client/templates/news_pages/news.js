var incrementLimit = function(inc) {
	newLimit = Session.get('limit') + inc;
	Session.set('limit', newLimit);
}

Template.newsApp.created = function() {
	Session.setDefault('limit', 9);
	this.subscribe('latestNews', Session.get('limit'));
}

Template.newsApp.rendered = function() {
	this.autorun(function() {
		this.subscribe('latestNews', Session.get('limit'));
	});
}

Template.newsPage.events({
	'click .load-more': function(e) {
		e.preventDefault();
		incrementLimit(6);
	}
});

Template.newsApp.helpers({
	latestNews: function() {
		var latestNews = xbdNews.find({}, { sort: { updated: -1 }, limit: Session.get('limit') }).fetch();
		return latestNews;
	}
});

Tracker.autorun(function() {
});