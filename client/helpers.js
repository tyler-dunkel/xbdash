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
    }/*,
    chkVerify: function () {
        if (Accounts._verifyEmailToken) {
            Accounts.verifyEmail(Accounts._verifyEmailToken, function(err){
                if (err != null) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }*/
});