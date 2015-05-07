Template.dashboard.rendered = function() {
}

Template.logInForm.helpers({
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
});

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
    },
    'click [ui-toggle]': function(event) {
        event.preventDefault();
        var $this = $(event.target);
        $this.attr('ui-toggle') || ($this = $this.closest('[ui-toggle]'));
        var $target = $($this.attr('target')) || $this;
        $target.toggleClass($this.attr('ui-toggle'));
    },
    'click [ui-nav] a': function(event) {
        var $this = $(event.target), $active;
        $this.is('a') || ($this = $this.closest('a'));
        
        $active = $this.parent().siblings( ".active" );
        $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
        
        ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
        $this.parent().toggleClass('active');
        
        $this.next().is('ul') && event.preventDefault();
    }
});

Tracker.autorun(function() {
});