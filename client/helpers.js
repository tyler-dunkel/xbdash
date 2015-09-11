numberFormatter = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var helpers = {
    appName: function () {
        return "XBdash";
    },
    copyrightInfo: function() {
        return "XBdash © 2015. All Rights Reserved.";
    },
    chkGamerStatus: function () {
        var user = Meteor.user();
        if (user && user.gamertagScanned) {
            return true;
        }
        return false;
    },
    chkEmail: function () {
        //var userId = Meteor.userId();
        console.log(Meteor.user().services);
        //console.log(Meteor.user().services.facebook.email);
        if (Meteor.user() && !Meteor.user().emails) {
            if (Meteor.user().services && Meteor.user().services.twitter.screenName) {
                return true;
            }
        }
        return false;
    },
    chkSocial: function () {
        if (Meteor.user() && Meteor.user().services) {
            return true;
        }
        return false;
    },
    chkFacebook: function () {
        if (Meteor.user() && Meteor.user().services && Meteor.user().services.facebook) {
            return true;
        }
        return false;
    },
    chkTwitter: function () {
        if (Meteor.user() && Meteor.user().services && Meteor.user().services.twitter) {
            return true;
        }
        return false;
    }
};

_.each(helpers, function(value, key){
    Template.registerHelper(key, value);
});