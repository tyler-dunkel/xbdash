//server
process.env.MAIL_URL="smtp://xboxdashbugreporter%40gmail.com:theskyisblue@smtp.gmail.com:465/";
Meteor.methods({
	contactUsEmail: function(name, email, text) {
		Email.send({
			from: "xboxdashbugreporter@gmail.com",
			to: "tyler.dunkel@gmail.com",
			subject: "from: " + email,
			text: text
		});
	}
});

// Meteor.startup(function() {
// 	Email.send({
// 		from: "xboxdashbugreporter@gmail.com",
// 		to: "kguirao87@gmail.com",
// 		subject: "hello this is an email from xboxdash",
// 		text: "does this work?"
// 	});
// });