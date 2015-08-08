numberFormatter = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var helpers = {
    appName: function () {
        return "XBdash";
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
    }
};

_.each(helpers, function(value, key){
    Template.registerHelper(key, value);
});