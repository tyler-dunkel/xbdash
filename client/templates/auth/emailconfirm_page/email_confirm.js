Template.confirmEmail.created = function() {
}

Template.confirmEmail.rendered = function() {
}

Template.confirmEmail.events({
    'click #resend-submit': function(e) {
        e.preventDefault();
        Meteor.call('sendVerificationEmail');
        return;
    }
});

Tracker.autorun(function() {
});