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

	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ rel: "icon", type: "image/x-icon", href: "https://www.xbdash.com/img/favicon.ico" },
		{ rel: "canonical", href: window.location.href }
	];

	var dashboardMeta = [
		{ name: "description", content: "Review your achievements per day, gamerscore per day, and your game genre distribution." },
		{ property: "fb:app_id", content: Meteor.settings.public.facebookAppId },
		{ property: "og:description", content: "Review your achievements per day, gamerscore per day, and your game genre distribution." },
		{ property: "og:image", content: "https://www.xbdash.com/img/share-default.jpg" },
		{ property: "og:locale", content: "en_US" },
		{ property: "og:site_name", content: "XBdash" },
		{ property: "og:title", content: "Welcome to Your Dashboard - XBdash" },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: window.location.href },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:description", content: "Review your achievements per day, gamerscore per day, and your game genre distribution." },
		{ name: "twitter:title", content: "Welcome to Your Dashboard - XBdash" },
		{ name: "twitter:image", content: "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("Welcome to Your Dashboard - XBdash");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < dashboardMeta.length; i++) {
		DocHead.addMeta(dashboardMeta[i]);;
	}
});