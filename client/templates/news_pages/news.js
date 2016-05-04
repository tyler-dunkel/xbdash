var newsLimit;

Template.newsSection.created = function() {
	newsLimit = new ReactiveVar();
	newsLimit.set(9);
	var self = this;

	console.log(this.data.getSource);
	this.autorun(function() {
		switch(self.data.getSource) {
		case 'xbdash':
			self.subscribe('xbdashNews', newsLimit.get());
			break;
		case 'polygon':
			self.subscribe('polygonNews', newsLimit.get());
			break;
		default:
			self.subscribe('latestNews', newsLimit.get());
			return;
		}
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
	latestNews: function(getSource) {
		return xbdNews.find({
			source: getSource
		}, {
			sort: { updated: -1 },
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
			newsLimit.set(newsLimit.get() + 9);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}