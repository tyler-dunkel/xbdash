Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }
    user.gamertagScanned = { status: 'false', lastUpdate: null };
    user.userSeenReferralBox = false;
    user.userReferralCount = 0;
    return user;
});

Accounts.config({
    sendVerificationEmail: true
});

Accounts.emailTemplates.from = 'XBdash <contact@email.xbdash.com>';
Accounts.emailTemplates.siteName = 'XBdash';
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Activate your XBdash account';
}

SSR.compileTemplate( 'verifyEmail', Assets.getText( 'verify-email.html' ) );
SSR.compileTemplate( 'resetEmail', Assets.getText( 'reset-password.html' ) );
// SSR.compileTemplate( 'welcomeEmail', Assets.getText( 'welcome-email.html' ) );

Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    try {
        return SSR.render( 'verifyEmail', { confirmUrl: url });
    } catch (error) {
        logger.info('Error rendering Verify email.');
        return;
    }
}

Accounts.emailTemplates.resetPassword.subject = function(user) {
    return 'XBdash Account Password Reset';
}

Accounts.emailTemplates.resetPassword.html = function (user, url) {
    try {
        return SSR.render( 'resetEmail', { resetUrl: url });
    } catch (error) {
        logger.info('Error rendering Reset Password email.');
        return;
    }
}

// Accounts.emailTemplates.headers = {
//     'X-MC-AutoText': true
// };

UserStatus.events.on("connectionLogin", function(fields) {});
UserStatus.events.on("connectionLogout", function(fields) {});