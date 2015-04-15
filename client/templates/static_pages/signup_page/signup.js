Template.signUp.rendered = function() {
	//var ckbox = new ReactiveVar(false);
	Session.setDefault("signUpCb", false);
}

Template.signUp.events({
	'submit #signupform': function(e) {
		e.preventDefault();

		//validate the form
		var isValid = ValidateForm.validate('#signupform');
		if (!isValid) return;

		//grab values needed to create a user
		var gamertag = $("#gamertag").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var passwordConfirm = $("#password2").val();

		if (password !== passwordConfirm) return;

		//set up the loading screen
		var message = "<h3>Please wait while we retrieve your data!</h3>";
		var spinner = "<div class='spinner'>" +
				"<div class='double-bounce1'></div> " + 
 				"<div class='double-bounce2'></div> " +
				"</div>";
		if (! Session.get('loadingScreen')) {
			loading = window.pleaseWait({
				logo: 'img/xboxdash_whiteicon.png',
				backgroundColor: '#138013',
				loadingHtml: message + spinner
			});
			Session.set('loadingScreen', true);
		}

		Meteor.call('chkGamertag', gamertag, function(error, result) {
			if (typeof error != 'undefined') {
				if (loading) {
					loading.finish();
					Session.set('loadingScreen', false);
				}
				sweetAlert({
					title: error.reason,
					text: error.details,
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "OK",
					closeOnConfirm: false,
					html: true
				});
				//Router.go('signUp');
				return;
			}
			if (result.content) {
				console.log("got it");
				var user = {username: gamertag, email: email, password: password, profile: {xuid: result.content}};
				Accounts.createUser(user, function(error) {
					if (error) {
						console.log(error);
					} else {
						Meteor.call('retrieveData', user, function(error, result) {
							//console.log(result);
							if (loading) {
								loading.finish();
								Session.set('loadingScreen', false);
							}
							Router.go('home');
							return;
						});
					}
				});
			}
			Meteor._debug("howd it get here?"); 
		});
	},
	'click .ckbox': function(event) {
		var value = $(event.target).is(':checked');
		Session.set("signUpCb", value);
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
	var value = Session.get("signUpCb");
	if (value === true) {
		$(".sign-up-submit").removeClass('disabled');
	} else {
		$(".sign-up-submit").addClass('disabled');
	}
});