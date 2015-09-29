var newsLimit = new ReactiveVar();

Template.newsPage.events({
});

Template.newsSection.created = function() {
	newsLimit.set(9);
	this.subscribe('latestNews', newsLimit.get());
}

Template.newsSection.rendered = function() {
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

Template.newsSection.helpers({
	latestNews: function() {
		return xbdNews.find({}, {
			sort: { updated: -1 },
			limit: newsLimit.get()
		}).fetch();
	},
	hasMoreResults: function() {
		//var xbdNewsCount = xbdNews.find({}).count();
		var newsLimitCurrent = newsLimit.get();
		var xbdNewsCount = xbdNews.find({}).count();
		console.log(newsLimitCurrent)
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
			newsLimit.set(newsLimit.get() + 9);
		}
	} else {
		if (target.data("visible")) {
			console.log("target became invisible");
			target.data("visible", false);
		}
	}
}