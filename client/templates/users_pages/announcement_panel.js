
Template.xbdAnnouncements.created = function() {
	this.subscribe('xbdAnnouncements');
}

Template.xbdAnnouncements.helpers({
	announcements: function() {
		return xbdAnnouncements.find({}, {sort: {createdAt: -1}, limit: 5});
	},
	getDate: function() {
		return moment(this.createdAt).format('MMMM YYYY');
	}
});

Template.xbdTweets.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userProfile', gamertagSlug);

	var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	var self = this;
	var screenName;

	if (user && user.services && user.services.twitter) {
		screenName = user.services.twitter.screenName;
	} else {
		screenName = 'xboxdash';
	}

	self.tweetText = new ReactiveVar();

	Meteor.call('getTweets', screenName, function(err, result) {
		if (err) { console.log(err) }
		self.tweetText.set(result);
	});
}

Template.xbdTweets.helpers({
	getTwitterScreenName: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var screenName;
		if (user && user.services && user.services.twitter) {
			return user.services.twitter.screenName;
		}
		return 'xboxdash';
	},
	userTweet: function () {
		var tweets = Template.instance().tweetText.get();
		if (tweets && tweets.result) {
			return tweets.result;
		}
		return [];
	},
	tweetDate: function () {
		if (this && this.created_at) {
			return moment(this.created_at).fromNow();
		}
		return '';
	},
	getTweetText: function() {
		var tweets = Template.instance().tweetText.get();
		var tweetText = this.text;
		var self = this;
		var richTextTweet = '';
		if (this.entities && this.entities.urls && this.entities.urls.length > 0) {
			this.entities.urls.forEach(function(url) {
				var startIdx = url.indices[0];
				var endIdx = url.indices[1];
				var link = tweetText.slice(startIdx, endIdx);
				var aTag = '<a class="twitter-box text-success" href="' + link + '">' + link + '</a>';
				richTextTweet = '<div>' + tweetText.slice(0, startIdx) + aTag + tweetText.slice(endIdx) + '</div>';
			});
			return richTextTweet;
		} else {
			return this.text;
		} 
	},
	getTweetImage: function() {
		var tweets = Template.instance().tweetText.get();
		if (this.entities && this.entities.media && this.entities.media.length > 0) {
			return "<img class='img-responsive' src='" + this.entities.media[0].media_url_https + "'>";
		}
	}
});