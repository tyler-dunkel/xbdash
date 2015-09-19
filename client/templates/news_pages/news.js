var newsLimit = new ReactiveVar();
Template.newsApp.created = function() {
	newsLimit.set(10);
	this.subscribe('latestNews', newsLimit.get());
}

Template.newsApp.rendered = function() {
	$(window).scroll(showMoreVisible);
}

Template.newsPage.events({
	'click .load-more': function(e) {
		e.preventDefault();
	}
});

Template.newsApp.helpers({
	latestNews: function() {
		return xbdNews.find({}, {
			sort: { updated: -1 },
			fields: {
				updated: 1,
				title: 1,
				content: 1,
				slug: 1,
				author: 1,
				shareCount: 1
			},
			limit: newsLimit.get()
		}).fetch();
	},
	hasMoreResults: function() {
		//var xbdNewsCount = xbdNews.find({}).count();
		var newsLimitCurrent = newsLimit.get();
		var xbdNewsCount = xbdNews.find({}).count();
		console.log(xbdNewsCount);
		return ! (xbdNewsCount < newsLimit.get());
	}
});

Tracker.autorun(function() {
});

function showMoreVisible() {
	var threshold, target = $("#hasMoreResults");
	if (!target.length) return;

	threshold = $(window).scrollTop() + $(window).height() - target.height();

	if (target.offset().top < threshold) {
		if (!target.data("visible")) {
			console.log("target became visible");
			target.data("visible", true);
			newsLimit.set(newsLimit.get() + 10);
		}
	} else {
		if (target.data("visible")) {
			console.log("target became invisible");
			target.data("visible", false);
		}
	}
}