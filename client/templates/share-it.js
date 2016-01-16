Template.shareIt.helpers({
	xbdData: function() {
		var getImage = "/img/news-default.jpg";
		
		return {
			title: this.title,
			author: this.author,
			image: function () {
		        return getImage;
	    	}
		}
	}
});

ShareIt.configure({
	siteOrder: ['facebook', 'twitter', 'email'],
	sites: {
	  	'facebook': {
	  		'appId': null
	  	},
        'twitter': {},
        'googleplus': {},
        'pinterest': {}
    },
    classes: "large btn",
    iconOnly: false,
    applyColors: true,
    faSize: '',
    faClass: ''
});