var socialLoginReferer = Session.set("socialLoginReferer", "");

Template.inviteForm.events({
	'submit #contest-form': function(e) {
		subMana.clear();
		e.preventDefault();

		//validate the form
		var isValid = ValidateForm.validate('#contest-form');
		if (!isValid) return;

		//grab values needed to create a user
		var referrerId = Router.current().params.userId;
		var email = $("#email").val();
		console.log(referrerId);

		// Meteor.call('userReferred', user, referrerId, function(error, result) {
		// 	console.log('this worked');
		// });

		$('#share-buttons').show();
		$('#contest-form').hide();
	},
	'click #invite-more': function (e) {
		e.preventDefault();

		$('#share-buttons').hide();
		$('#contest-form').show().trigger('reset');
	},
	'blur .form-control': function(e) {
		var input = e.target;
		ValidateForm.validateInput(input);
	},
	'focus .form-control': function(e) {
		ValidateForm.clearInputStatus(e.target);
	}
});

Template.referralForm.events({
	'submit #signupform': function(e) {
		subMana.clear();
		e.preventDefault();

		//validate the form
		var isValid = ValidateForm.validate('#signupform');
		if (!isValid) return;

		//grab values needed to create a user
		var referrerId = Router.current().params.userId;
		var email = $("#email").val();
		console.log(referrerId);

		Meteor.call('userReferred', user, referrerId, function(error, result) {
			console.log('this worked');
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