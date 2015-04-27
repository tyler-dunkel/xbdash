Meteor.methods({
	chkEmail: function(gamertag) {
		check(gamertag, String);
	}
});