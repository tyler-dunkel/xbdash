Template.userDropdown.rendered = function() {
};

Template.userDropdown.helpers({
    gamerImage: function () {
        var user = Meteor.user();
        var defaultGamerImage = "/img/gamerpic-default.jpg";
        if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
            defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
        }
        if (user && user.xboxProfile) {
            defaultGamerImage =  "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.xboxProfile.gameDisplayPicRaw);
        }
        return defaultGamerImage;
    }
});

Template.userDropdown.events({
    'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout(function(error){
            if (error) {
                throw new Meteor.Error("Logout failed");
            }
            Router.go('logIn');
        });
    },
    'click .profile-button': function(e) {
        e.preventDefault();
        var user = Meteor.user();
        Router.go('userPage', {gamertagSlug: user.gamertagSlug});
    }
});