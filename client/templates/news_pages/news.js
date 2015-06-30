Template.newsApp.rendered = function() {
}

Template.newsApp.onCreated(function() {
	this.subscribe('latestNews');
});

Template.newsApp.helpers({
	latestNews: function() {
		var latestNews = newsPolygon.find({}, { sort: { updated: -1 }, limit: 9 }).fetch();
		return latestNews;
	},
	getImage: function () {
        var image = this.content.match(/<img[^>]*>/);
        if (image) {
            var getImage = image[0].match(/src="(.+?)"/)[1];
        }
        return getImage;
	},
	updatedDate: function() {
		return moment(this.updatedDate).format('MMMM Do YYYY, h:mm:ss a'); // June 30th 2015, 6:28:37 pm
	},
	shareCount: function() {
		var shareCount = "0";
		var articleUrl = window.location.href;
		var url = "https://api.facebook.com/method/links.getStats?urls="+articleUrl+"&format=json";
		var result = Meteor.http.get(url, {timeout:30000});
		if (result.statusCode === 200) {
			var respJson = JSON.parse(result.content);
			shareCount = respJson.total_count;
			console.log(shareCount);
			return shareCount;
		}
		return shareCount;
	}
});

Template.newsPage.events({
});

Tracker.autorun(function() {
});