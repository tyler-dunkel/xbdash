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

	var imageAnalyzer = {
		name: 'image',
		getMediaFromContent(content) {
			if (content) {
				var urls = content.match(/(\S+\.[^/\s]+(\/\S+|\/|))(.jpg|.png|.gif)/g) ;
				if (urls && urls[0]) {
					return urls[0];
				}
			}
			return '';
	    },
	    getMarkup: (mediaContent) => `<img src="${mediaContent}" />`
	};

	var youtubeAnalyzer = {
		name: 'youtube',
		getMediaFromContent(content) {
			var parts = (/(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/([\w\=\?]+)/gm).exec(content);
			let mediaContent = '';
			if (parts && parts[3]) {
				let id = parts[3];
				if (id.indexOf('v=') > -1) {
					var subParts = (/v=([\w]+)+/g).exec(id);
					if (subParts && subParts[1]) {
						id = subParts[1];
					}
				}
				mediaContent = `http://www.youtube.com/embed/${id}`;
			}
			return mediaContent;
		},
		getMarkup: (mediaContent) => `<iframe src="${mediaContent}" type="text/html" frameborder="0"></iframe>`
	};

	Comments.config({
		publishUserFields: { 
			"gamercard.gamertag": 1,
			"gamercard.gamerscore": 1,
			"gamercard.gamerpicLargeSslImagePath": 1
		},
		mediaAnalyzers: [
			imageAnalyzer,
			youtubeAnalyzer
		],
		replies: true,
		anonymous: false
	});

	Comments.ui.config({
		limit: 5,
		loadMoreCount: 10,
		defaultAvatar: '/img/user-default.jpg',
		markdown: false
	});

	$.cloudinary.config({
		cloud_name: 'xbdash'
	});
});