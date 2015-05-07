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
    },
    'click [ui-toggle]': function(event) {
        event.preventDefault();
        var $this = $(event.target);
        $this.attr('ui-toggle') || ($this = $this.closest('[ui-toggle]'));
        
        $this.toggleClass('active'); // toggles active class on dedent/indent
        
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