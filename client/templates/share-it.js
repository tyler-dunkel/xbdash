Template.shareIt.helpers({
	xbdData: function() {
		return {
			//title: this.data,
			//author: Meteor.users.findOne(this.authorId)
		}
	}
});

ShareIt.configure({
    useFB: true,          // boolean (default: true)
    useTwitter: true,     // boolean (default: true)
    classes: "large btn", // string (default: 'large btn')
    iconOnly: false,      // boolean (default: false)
    applyColors: true     // boolean (default: true)
});