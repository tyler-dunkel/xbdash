Template.shareIt.helpers({
	xbdData: function() {
		return {
			title: this.title,
			author: this.author
		}
	}
});

ShareIt.configure({
	siteOrder: ['facebook', 'twitter', 'email'],
	sites: {
	  	'facebook': {},
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