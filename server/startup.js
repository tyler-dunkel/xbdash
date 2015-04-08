//server
Meteor.startup(function() {
	
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