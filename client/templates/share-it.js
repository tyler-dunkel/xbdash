Template.shareIt.helpers({
	xbdData: function() {
		var content = this.content;
		var author = this.author;
		console.log(author);
		// var getImage = content.match('/<img.+src=[\'"](?P<src>.+?)[\'"].*>/i');

		// if (!getImage) {
		var getImage = "/img/news-default.jpg";
		// }

		return {
			title: this.title,
			author: 'XboxDash',
			image: function () {
		        return getImage;
	    	}
		}
	}
});

ShareIt.configure({
	sites: {
		'facebook': {
			'appId': null
		},
		'twitter': {},
		'pinterest': {}
	},
	classes: "large btn",
	iconOnly: false,
	applyColors: true,
	faSize: '',
	faClass: ''
});