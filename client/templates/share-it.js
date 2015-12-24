Template.shareIt.helpers({
	xbdData: function() {
		return {
			//title: this.data,
			//author: Meteor.users.findOne(this.authorId)
		}
	}
});

ShareIt.configure({
	siteOrder: ['facebook', 'twitter', 'email'],
	sites: {                // nested object for extra configurations
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