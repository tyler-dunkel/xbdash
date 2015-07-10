Meteor.startup(function() {
	ValidateForm.config({
	  debug: false,
	  rootLayout: 'layout'
	});

	toastr.options = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": true,
		"progressBar": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "6000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	};

	Comments.ui.config({
	    limit: 5,
	    loadMoreCount: 10,
	    template: 'bootstrap'
	});

	Avatar.options = {
		defaultImageUrl: 'img/a0.jpg'
		//customImageProperty: 'user.profile.gamercard.gamerpicLargeImagePath'
	};

	Comments.changeSchema(function (currentSchema) {
	});
});