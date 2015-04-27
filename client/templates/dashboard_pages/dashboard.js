Template.dashboard.rendered = function() {
}

Template.dashboard.events({
    'click #logout': function(event) {
        Meteor.logout(function(error){
            if (error) {
                throw new Meteor.Error("Logout failed");
            } else {
            	Router.go('home');
				return;
            }
        })
    }
});

Tracker.autorun(function() {
});