Template.contestAdsResponsiveRight.rendered = function () {
	$('#banner-affix').affix({
		offset: {
			top: 110
		}
	});
}

Template.googlePageLevelAds.rendered = function () {
	var script = document.createElement("script");
	script.async = true;
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	// var script2 = '<script>(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-2098590497386911", enable_page_level_ads: true });</script>';
	$("#gads-page-level").append(script);
}

Template.googleAdsMedium.rendered = function () {
	var script = document.createElement("script");
	script.async = true;
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-top").append(script);
}

Template.googleAdsResponsiveRight.rendered = function () {
	$('#gads-responsive-right').affix({
		offset: {
			top: 110
		}
	});
	var script = document.createElement("script");
	script.async = true;
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-right").append(script);
}

// Template.googleAdsResponsiveLeft.rendered = function () {
// 	$(document).ready(function() {
// 		var script = document.createElement("script");
// 		script.type="text/javascript";
// 		script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
// 		$("#gads-responsive-left").append(script);

// 		var script2 = '<script>(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-2098590497386911", enable_page_level_ads: true });</script>';
// 		$("#gads-responsive-left").append(script2);
// 	});
// }