Accounts.onCreateUser(function(options, user) {
	if (options.profile) {
		user.profile = options.profile;
	}
	user.gamertagScanned = false;
    //user.userSentWelcomeEmail = false;
	user.userSeenReferralBox = false;
	user.userReferralCount = 0;
	return user;
});

Accounts.config({
	sendVerificationEmail: true
});

Accounts.emailTemplates.from = 'XBdash <contact@xbdash.com>';
Accounts.emailTemplates.siteName = 'XBdash';
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Activate your XBdash account';
}
Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    var result;
    try {
        result = Mandrill.templates.render({
            template_name: 'verify-email',
            template_content: [
                {
                    name: 'CONFIRMURL',
                    content: url
                },
                {
                    name: 'FNAME',
                    content: user.username
                }
            ],
            merge_vars: [
                {
                    name: 'CONFIRMURL',
                    content: url
                },
                {
                    name: 'FNAME',
                    content: user.username
                }
            ]
        });
    } catch (error) {
    	console.error('Error while rendering Mandrill template', error);
    }
    return result.data.html;
}
Accounts.emailTemplates.resetPassword.subject = function(user) {
    return 'XBdash Account Password Reset';
}
Accounts.emailTemplates.resetPassword.html = function (user, url) {
    var result;
    try {
        result = Mandrill.templates.render({
            template_name: 'reset-password',
            template_content: [
                {
                    name: 'RESETURL',
                    content: url
                },
                {
                    name: 'FNAME',
                    content: user.username
                }
            ],
            merge_vars: [
                {
                    name: 'RESETURL',
                    content: url
                },
                {
                    name: 'FNAME',
                    content: user.username
                }
            ]
        });
    } catch (error) {
        console.error('Error while rendering Mandrill template', error);
    }
    return result.data.html;
}

Accounts.emailTemplates.headers = {
    'X-MC-AutoText': true
};

UserStatus.events.on("connectionLogin", function(fields) {
	
});

UserStatus.events.on("connectionLogout", function(fields) {
	
});