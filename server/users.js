Accounts.onCreateUser(function(options, user) {
	if (options.profile) {
		user.profile = options.profile;
	}
	user.userSeenReferralBox = false;
	user.userReferralCount = 0;
	return user;
});

Accounts.config({
		sendVerificationEmail: true
});


// By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
// Accounts.emailTemplates.from = 'XBdash <bugs@xbdash.com>';
Accounts.emailTemplates.from = 'XboxDash <xboxdashbugreporter@gmail.com>';

// The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
///Accounts.emailTemplates.siteName = 'XboxDash';

// A Function that takes a user object and returns a String for the subject line of the email.
Accounts.emailTemplates.verifyEmail.subject = function(user) {
	return 'Confirm Your Email Address';
};

// A Function that takes a user object and a url, and returns the body text for the email.
Accounts.emailTemplates.verifyEmail.html = function(user, url) {
	var template = '<div style="text-align:center;"><img src="img/xbdash_green.png" /></div>';
	template += '<p>Click on the following link to verify your email address: ' + url + '</p>';
	return template;
};

UserStatus.events.on("connectionLogin", function(fields) {
	
});

UserStatus.events.on("connectionLogout", function(fields) {
	
});