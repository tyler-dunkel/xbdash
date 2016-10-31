Template.dashboardHeaderTwo.rendered = function () {
	$('.nav-toggle').on('click', function () {
		$('.nav-toggle').toggleClass('active');
		$('.app-aside').toggleClass('off-screen');
	});
	$('.settings-toggle').on('click', function () {
		$('.settings-toggle').toggleClass('active');
		$('.navbar-collapse').toggleClass('show');
	});
}

Template.dashboardHeaderTwo.helpers({
});

Template.dashboardHeaderTwo.events({
	'click #logout': function(e) {
		e.preventDefault();
		Meteor.logout(function(error){
			if (error) {
				throw new Meteor.Error("Logout failed");
			}
			Router.go('logIn');
		});
	},
	'click [ui-toggle]': function(e) {
		var user = Meteor.user();
		
		e.preventDefault();
		
		var $this = $(e.target);
		
		$this.attr('ui-toggle') || ($this = $this.closest('[ui-toggle]'));
		$this.toggleClass('active');

		var $target = $($this.attr('target')) || $this;
		
		$target.toggleClass($this.attr('ui-toggle'));
		
		var currentRoute = Router.current().route.getName();
	},
	'click [ui-nav] a': function(e) {
		var $this = $(e.target), $active;

		$this.is('a') || ($this = $this.closest('a'));
		$active = $this.parent().siblings( ".active" );
		$active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
		($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
		$this.parent().toggleClass('active');
		$this.next().is('ul') && e.preventDefault();
	}
});

Template.dashboardHeader.rendered = function () {
	$('.nav-toggle').on('click', function () {
		$('.nav-toggle').toggleClass('active');
		$('.app-aside').toggleClass('off-screen');
	});
	$('.settings-toggle').on('click', function () {
		$('.settings-toggle').toggleClass('active');
		$('.navbar-collapse').toggleClass('show');
	});
}

Template.dashboardHeader.helpers({
	isStatsDisabled: function () {
		var user = Meteor.user();
		var userString = EJSON.stringify(user);
		if (user && user.gamertagScanned) {
			if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
				return;
			}
		}
		return 'disabled hide';
	},
	isDashboardPage: function () {
		if (Router.current().route.getName() === 'home') {
			return 'disabled hide';
		}
	}
});

Template.dashboardHeader.events({
	'click #logout': function(e) {
		e.preventDefault();
		Meteor.logout(function(error){
			if (error) {
				throw new Meteor.Error("Logout failed");
			}
			Router.go('logIn');
		});
	},
	'click [ui-toggle]': function(e) {
		var user = Meteor.user();
		
		e.preventDefault();
		
		var $this = $(e.target);

		$this.attr('ui-toggle') || ($this = $this.closest('[ui-toggle]'));
		$this.toggleClass('active'); // toggles active class on dedent/indent
		
		var $target = $($this.attr('target')) || $this;
		
		$target.toggleClass($this.attr('ui-toggle'));
		
		var currentRoute = Router.current().route.getName();
	},
	'click [ui-nav] a': function(e) {
		var $this = $(e.target), $active;

		$this.is('a') || ($this = $this.closest('a'));
		$active = $this.parent().siblings( ".active" );
		$active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
		($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
		$this.parent().toggleClass('active');
		$this.next().is('ul') && e.preventDefault();
	}
});