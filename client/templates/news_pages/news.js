Template.newsApp.rendered = function() {
}

Template.newsApp.onCreated(function() {
});

Template.newsApp.helpers({
	latestNews: function() {
		var latestNews = newsPolygon.find({}, { sort: { updated: -1 }, limit: 9 }).fetch();
		return latestNews;
	}
});

Template.newsPage.events({
});

Tracker.autorun(function() {
});