numberFormatter = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Template.registerHelper({
    appName: function () {
        return "XboxDash";
    },
    chkEmail: function () {
        //var userId = Meteor.userId();
        console.log(Meteor.user().services);
        //console.log(Meteor.user().services.facebook.email);
        if (!Meteor.user().emails) {
            if (Meteor.user().services.twitter.screenName) {
                return true;
            }
        }
        return false;
    },
    chkSocial: function () {
        if (!Meteor.user().services.twitter || 
            !Meteor.user().services.facebook) {
            return true;
        }
        return false;
    },
    chkFacebook: function () {
        if (Meteor.user().services.facebook) {
            return true;
        }
        return false;
    },
    chkTwitter: function () {
        if (Meteor.user().services.twitter) {
            return true;
        }
        return false;
    },
    chkVerify: function () {
        Accounts.verifyEmail(Accounts._verifyEmailToken, function(error) {
            if (error != null) {
                if (error.message = 'Verify email link expired [403]') {
                    console.log('Sorry this verification link has expired.')
                    return true;
                }
            } else {
                console.log('Thank you! Your email address has been confirmed.')
                return false;
            }
        });
    }
});