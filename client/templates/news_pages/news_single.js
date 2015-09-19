Template.newsSinglePage.rendered = function() {
}

Template.newsSinglePage.helpers({
	article: function() {
		var slug = Router.current().params.id;
		return xbdNews.findOne({ slug: id });
	},
	published: function () {
		return moment(this.published).format('MMMM Do YYYY, h:mm a');
	},
	shareData: function () {
		var slug = Router.current().params.id;
		var article = xbdNews.findOne({ slug: id });
	    return {
	    	title: article.title,
	    	author: article.author
	    }
	}
});

Tracker.autorun(function() {
});