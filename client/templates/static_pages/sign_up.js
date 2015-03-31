Template.aboutUs.events({
});

Template.signUpForm.rendered = function() {
	$( "#signupform" ).validate({
	  rules: {
	    field: {
	      required: true,
	      email: true
	    }
	  }
	});
}