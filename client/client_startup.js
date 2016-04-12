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

	ShareIt.configure({
		sites: {
			'facebook': {
				'appId': Meteor.settings.public.facebookAppId
			},
			'twitter': {},
			'pinterest': {},
			'googleplus': {}
		},
		classes: "large btn",
		iconOnly: false,
		applyColors: true,
		faSize: 'fa-lg',
		faClass: ''
	});

	Comments.config({
		publishUserFields: { 
			"gamercard.gamertag": 1,
			"gamercard.gamerscore": 1,
			"gamercard.gamerpicLargeSslImagePath": 1
		},
		replies: true,
		anonymous: false
	});

	Comments.ui.config({
		limit: 5,
		loadMoreCount: 10,
		markdown: false,
		template: 'bootstrap'
	});

	$.cloudinary.config({
		cloud_name: 'xbdash'
	});
});