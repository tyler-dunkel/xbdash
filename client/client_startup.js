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

	// var imageAnalyzer = {
	// 	name: 'image',
	// 	getMediaFromContent: function(content) {
	// 		if (content) {
	// 			var urls = content.match(/(\S+\.[^/\s]+(\/\S+|\/|))(.jpg|.png|.gif)/g) ;
	// 			if (urls && urls[0]) {
	// 				return urls[0];
	// 			}
	// 		}
	// 		return '';
	// 	},
	//     getMarkup: function(mediaContent) {
	//     	return `<img src="${mediaContent}" />`;
	//     }
	// };

	// var youtubeAnalyzer = {
	// 	name: 'youtube',
	// 	getMediaFromContent: function(content) {
	// 		var parts = (/(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/([\w\=\?]+)/gm).exec(content);
	// 		let mediaContent = '';
	// 		console.log('firing get media content');
	// 		if (parts && parts[3]) {
	// 			let id = parts[3];
	// 			if (id.indexOf('v=') > -1) {
	// 				var subParts = (/v=([\w]+)+/g).exec(id);
	// 				if (subParts && subParts[1]) {
	// 					id = subParts[1];
	// 				}
	// 			}
	// 			mediaContent = 'http://www.youtube.com/embed/${id}';
	// 		}
	// 		return mediaContent;
	// 	},
	// 	getMarkup: function(mediaContent) {
	// 		return `<iframe src="${mediaContent}" type="text/html" frameborder="0"></iframe>`;
	// 	}
	// };

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