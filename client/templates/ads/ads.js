Template.googleAdsResponsiveRight.onRendered(function() {
	$(document).ready(function() {
		var script = document.createElement("script");
		script.type="text/javascript";
		script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
		$("#gads-responsive-right").append(script);
	});
});

	// $(document).ready(function() {
	// 	// Load the Google Ads API
	// 	google.load("ads", "1");
		
	// 	// Init globals
	// 	google_ad_client 	= "ca-pub-2014481178377974";
	// 	google_ad_channel	= "5922086736";
		
	// 	gAds	= new Object(); // This is going to let us keep track of our ads.

	// function initPage() {
	// 	// Google cancelled this program...what a bummer
	// 	loadLeader("advertising, get rich quick, scams, internet radio");
	// 	// Put a delay in between the two ad spots just for sanity.
	// 	setTimeout (function (){
	// 		loadSide("xbox one, xbox, microsoft, video games, movies");
	// 	}, 1000);
	// }

	// 	function doAjaxAdsense(opts, container) {
	// 		// If the ad is already on the page, we just refresh it, otherwise, we create it.
	// 		var spotId	= opts.format + "_" + container.id;
	// 		if (gAds[spotId]) {
	// 			gAds[spotId].refresh({'hints' : opts.hints, 'ad_channel' : opts.ad_channel});
	// 		} else {
	// 			gAds[spotId] = new google.ads.Ad(google_ad_client, container, opts);
	// 		}
	// 	}

	// 	function loadSide(hints) {
	// 		doAjaxAdsense({
	// 			'format'		: "300x250",
	// 			'ad_slot'		: "1463478049",
	// 			hints			: hints
	// 			'ad_channel'	: google_ad_channel
	// 		}, document.getElementById('xbd-right-banner-ad'));
	// 	}
		
	// 	// Set the callback for the Google API load command
	// 	google.setOnLoadCallback(function() {});
	// });

// Template.googleAdsMedium.helpers({
// 	'unique': function() {
// 		return (new Date()).valueOf();
// 	}
// });

// Template.googleAdsResponsiveRight.helpers({
// 	'unique': function() {
// 		return (new Date()).valueOf();	
// 	}
// });