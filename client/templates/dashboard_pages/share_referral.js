Template.referralShareButtons.helpers({
	referralData: function() {
		var user = Meteor.user();
		var token = user._id;
		var title = "I just joined XBdash @ http://xboxdash.com";
		var thumbnail = function() {
			return "http://xboxdash.com/images/xbdash_green.png";
		};
		return data = {
			title: title,
			author: "XBdash.com",
			summary: "I just joined XBdash! Invite a friend and get $5 off the Exclusive XBdash launch T-shirt!",
			url: "http://xboxdash.com/referral-signup/" + token,
			image: thumbnail()
		};
	},
	logger: function () {
		console.log(this);
	}
});

ShareIt.configure({
    useFB: true,          // boolean (default: true)
    useTwitter: true,     // boolean (default: true)
    useGoogle: false,
    classes: "large btn", // string (default: 'large btn')
    iconOnly: false,      // boolean (default: false)
    applyColors: true     // boolean (default: true)
});