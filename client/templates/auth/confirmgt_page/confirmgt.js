Template.confirmGt.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user) {
			if (_.isEmpty(user.services)) {
				if (user.emails && user.emails[0] && !user.emails[0].verified) {
					Router.go('confirmEmail');
				}
			} else if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
				Router.go('home');
			}
		} else {
			Router.go('signUp');
		}
	});
};

Template.confirmGt.rendered = function() {
	var user = Meteor.user();

	if (Session.get('socialLoginReferer')) {
	}
}

Template.confirmGtForm.events({
	'click #logout': function(event) {
        Meteor.logout(function(error){
            if (error) {
                throw new Meteor.Error("Logout failed");
            } else {
            	Router.go('signUp');
				return;
            }
        })
    },
	'submit #gamertagform': function(e) {
		subMana.clear();
		e.preventDefault();

		var isValid = ValidateForm.validate('#gamertagform');
		if (!isValid) return;

		var gamertag = $("#gamertag").val();
		var email = $("#twitter-email").val();

		if (email !== undefined) {
			Meteor.call('setTwitterEmail', email, function(error, result) {
				if (typeof error !== 'undefined') {
					sweetAlert({
						title: error.reason,
						text: error.details,
						type: "error",
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "OK",
						closeOnConfirm: false,
						html: true
					});
					return;
				}
			});
		}

		Meteor.call('chkGamertag', gamertag, function(error, result) {
			if (typeof error != 'undefined') {
				sweetAlert({
					title: error.reason || 'Internal server error!',
					text: error.details || 'Server responded with 500.',
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "OK",
					closeOnConfirm: false,
					html: true
				});
				return;
			}
			if (result.content) {
				Router.go('home');
				Meteor.call('retrieveData', function(error, result) {
					if (result) {
						sweetAlert({
							title: 'Staying Engaged on XBdash',
							html: Blaze.toHTML(Template.welcomeOverlay),
							customClass: 'welcome-overlay',
							confirmButtonText: 'Let\'s Go!',
							confirmButtonColor: '#138013',
							closeOnConfirm: true,
							width: 1000
						});
						
					}
				});
			}
		});
	},
	'blur .form-control': function(e) {
		var input = e.target;
		ValidateForm.validateInput(input);
	},
	'focus .form-control': function(e) {
		ValidateForm.clearInputStatus(e.target);
	}
});

Tracker.autorun(function() {
});