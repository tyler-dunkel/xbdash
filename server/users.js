Accounts.onCreateUser(function(options, user) {
	if (options.profile) {
		user.profile = options.profile;
	}
	user.gamertagScanned = false;
	user.userSeenReferralBox = false;
	user.userReferralCount = 0;
	return user;
});

Accounts.config({
	sendVerificationEmail: true
});

var unsubscribeLink = "http://xboxdash.us11.list-manage1.com/unsubscribe?u=c66cacf1f6aa0c1dc079eeb16&id=1f53442338";

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
                    name: 'UNSUB',
                    content: unsubscribeLink
                }
            ],
            merge_vars: [
                {
                    name: 'CONFIRMURL',
                    content: url
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

Meteor.methods({
	deleteUser: function () {
		var user = Meteor.user();
		userAchievements.remove({ userId: user._id });
		userGames.remove({ userId: user._id });
		Meteor.users.remove({ _id: user._id });
	}
});