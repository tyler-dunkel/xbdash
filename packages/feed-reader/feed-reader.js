// Write your package code here!


var FeedParser = Npm.require('feedparser');
var Readable = Npm.require('stream').Readable;


var feedHandle = {
	getStream: function(content) {
		var stream = new Readable();
		//console.log(content);
		stream.push(content);
		stream.push(null);
		return stream;
	},
	handle: function(contentBuffer) {
		var stream = this.getStream(contentBuffer);
		var feedParser = new FeedParser();
		var newItemCount = 0;
		self = this;

		stream.pipe(feedParser);

		feedParser.on('meta', Meteor.bindEnvironment(function(meta) {
			// console.log("this is the title of the feed" + meta.title);
		}));

		feedParser.on('error', Meteor.bindEnvironment(function(error) {
			// console.log("this is an error with the feed" + error);
		}));

		feedParser.on('readable', Meteor.bindEnvironment(function() {
			var item;
			//console.log(str);
			while (item = feedParser.read()) {
				// console.log(item);
			}
		}));
	}
};

grabFeeds = function() {
	rssFeeds.find().forEach(function(feed) {
		// console.log(feed);
		try {
			var content = HTTP.get(feed.url, {responseType: 'buffer'}).content;
			feedHandle.handle(content);
		} catch (error) {
			// console.log(error);
			return true;
		}
	});
};

Meteor.startup(function() {
	Meteor.setTimeout(function() {
		grabFeeds();
	}, 5000);
});

