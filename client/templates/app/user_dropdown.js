Template.userDropdown.rendered = function() {
};

Template.userDropdown.events({
	'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout(function(error){
            if (error) {
                throw new Meteor.Error("Logout failed");
            }
            Router.go('logIn');
        });
    }
});