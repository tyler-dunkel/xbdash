Template.confirmGt.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user) {
			if (_.isEmpty(user.services)) {
				console.log("not social");
				if (user.emails && user.emails[0] && !user.emails[0].verified) {
					console.log("need to confirm email");
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
		Meteor.call('userReferredSocialSignup', user._id, Session.get('socialLoginReferer'), function(error, result) {
			if (error) {
				console.log(error);
				return;
			}
			Session.set('socialLoginReferer', "");
		});
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

		//validate the form
		var isValid = ValidateForm.validate('#gamertagform');
		if (!isValid) return;

		//grab values needed to create a user
		var gamertag = $("#gamertag").val();
		var email = $("#twitter-email").val();

		console.log(email);

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

		//set up the loading screen
		// var message = "<h3>Please wait while we retrieve your data!</h3>";
		// var spinner = "<div class='spinner'>" +
		// 		"<div class='double-bounce1'></div> " + 
		//		"<div class='double-bounce2'></div> " +
		// 		"</div>";

		// if (! Session.get('loadingScreen')) {
		// 	loading = window.pleaseWait({
		// 		logo: 'img/xboxdash_whiteicon.png',
		// 		backgroundColor: '#138013',
		// 		loadingHtml: message + spinner
		// 	});
		// 	Session.set('loadingScreen', true);
		// }
		
		Meteor.call('chkGamertag', gamertag, function(error, result) {
			if (typeof error != 'undefined') {
				// if (loading) {
				// 	loading.finish();
				// 	Session.set('loadingScreen', false);
				// }
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
			if (result.content) {
				Router.go('home');
				Meteor.call('retrieveData', function(error, result) {
					// if (loading) {
					// 	loading.finish();
					// 	Session.set('loadingScreen', false);
					// }
					Meteor.call('sendWelcomeEmail');
					return;
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