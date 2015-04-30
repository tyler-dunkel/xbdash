//server
Meteor.startup(function() {

});

function updateUserData(userId) {
	Meteor._debug(userId);
	Meteor._debug("this is the updateUserData fucntion");
	var user = Meteor.users.findOne(userId);
	Meteor._debug(user);
	if (typeof user.profile.xuid !== 'undefined') {
		Meteor._debug("fires when xuid is present");
	} else {return;}
}

UserStatus.events.on("connectionLogin", function(fields) {
	Meteor._debug("this is the connectionActive function");
	var updateUserDataTimer = Meteor.setInterval(function() {
		updateUserData(fields.userId);
	}, 5000);
});

process.env.MAIL_URL="smtp://xboxdashbugreporter%40gmail.com:theskyisblue@smtp.gmail.com:465/";
Meteor.methods({
	contactUsEmail: function(name, email, subject, text) {
		Email.send({
			from: "xboxdashbugreporter@gmail.com",
			to: "kguirao87@gmail.com",
			subject: subject,
			text: text
		});
	}
});