var newsLimit = new ReactiveVar();

Template.newsSection.created = function() {
	newsLimit.set(9);
	
	this.autorun(function() {
		Meteor.subscribe('latestNews', newsLimit.get());
	});
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
			sort: {
				source: -1,
				updated: -1
			},
			limit: newsLimit.get()
		}).fetch();
	},
	hasMoreResults: function() {
		var newsLimitCurrent = newsLimit.get();
		var xbdNewsCount = xbdNews.find({}).count();
		return ! (xbdNewsCount < newsLimitCurrent);
	}
});

function showMoreVisible() {
	var threshold, target = $("#hasMoreResults");
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - target.height();
	if (target.offset().top < threshold) {
		if (!target.data("visible")) {
			target.data("visible", true);
			newsLimit.set(newsLimit.get() + 5);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}