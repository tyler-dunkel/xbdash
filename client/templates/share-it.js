Template.shareIt.helpers({
	xbdData: function() {
		return {
			//title: this.data,
			//author: Meteor.users.findOne(this.authorId)
		}
	}
});

ShareIt.configure({
	sites: {                // nested object for extra configurations
	  	'facebook': {
        	'appId': Meteor.settings.services.facebookAppId
        },
        'twitter': {},
        'googleplus': {},
        'pinterest': {}
    }
    classes: "large btn",
    iconOnly: false,
    applyColors: true,
    faSize: '',
    faClass: ''
});