Template.newsSinglePage.rendered = function() {
}

Template.newsSinglePage.helpers({
	article: function() {
		var slug = Router.current().params.slug;
		return xbdNews.findOne({ slug: slug });
	},
	published: function () {
		return moment(this.published).format('MMMM Do YYYY, h:mm a');
	},
	shareData: function () {
		var slug = Router.current().params.slug;
		var article = xbdNews.findOne({ slug: slug });
	    return {
	    	title: article.title,
	    	author: article.author
	    }
	}
});

Tracker.autorun(function() {
});