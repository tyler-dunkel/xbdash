Template.newsSinglePage.rendered = function() {
}

Template.newsSinglePage.helpers({
	article: function() {
		var id = Router.current().params.id;
		return xbdNews.findOne({ id: id });
	},
	published: function () {
		return moment(this.published).format('MMMM Do YYYY, h:mm a');
	},
	shareData: function () {
		var id = Router.current().params.id;
		var article = xbdNews.findOne({ id: id });
	    return {
	    	title: article.title,
	    	author: article.author
	    }
	}
});

Tracker.autorun(function() {
});