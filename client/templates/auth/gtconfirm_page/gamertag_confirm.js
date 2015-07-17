Template.confirmGt.created = function() {
	if (Accounts._verifyEmailToken) {
		Accounts.verifyEmail(Accounts._verifyEmailToken, function(err){
			if (err != null) {
				// handle the error
				Router.go('confirmEmail');
			} else {
				// do what you want, maybe redirec to some route show verify successful message
				this.next();
			}
		});
	}
};

Template.confirmGt.rendered = function() {
}

Template.confirmGt.events({
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
				return;
			}
			if (result.content) {
				var userId = Meteor.userId();
				var setGamertag = Meteor.users.find({_id: userId}, {username: {$exists: true}});

				if (typeof setGamertag !== 'undefined') {
					Meteor.users.upsert({_id: userId}, {$set: {username: user.username, "profile.xuid": user.profile.xuid}});
				} else {
					Meteor.call('retrieveData', user, function(error, result) {
						if (loading) {
							loading.finish();
							Session.set('loadingScreen', false);
						}
						Router.go('home');
						return;
					});
				}
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