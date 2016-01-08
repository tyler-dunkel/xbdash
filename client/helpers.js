numberFormatter = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

shareFormatter = function format(n) {
    with (Math) {
        var base = floor(log(abs(n))/log(1000));
        var suffix = 'kmb'[base-1];
        return suffix ? String(n/pow(1000,base)).substring(0,3)+suffix : ''+n;
    }
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
            if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
                return true;
            }
        }
        return false;
    },
    chkEmail: function () {
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
    },
    getCurrentPath: function () {
        return Router.current().route.path(this);
    }
};

_.each(helpers, function(value, key){
    Template.registerHelper(key, value);
});