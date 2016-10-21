Template.contestAdsResponsiveRight.rendered = function () {
	$('#banner-affix').affix({
		offset: {
			top: 110
		}
	});
}

Template.googleAdsMedium.rendered = function () {
	$(document).ready(function() {
		var script = document.createElement("script");
		script.type="text/javascript";
		script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
		$("#gads-responsive-top").append(script);

		var script3 = '<script>(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-2098590497386911", enable_page_level_ads: true });</script>';
		$("#gads-responsive-top").append(script3);
	});
}

Template.googleAdsResponsiveRight.rendered = function () {
	$('#gads-responsive-right').affix({
		offset: {
			top: 110
		}
	});
	$(document).ready(function() {
		var script4 = document.createElement("script");
		script4.type="text/javascript";
		script4.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
		$("#gads-responsive-right").append(script4);
	});
}

Template.googleAdsResponsiveLeft.rendered = function () {
	$(document).ready(function() {
		var script = document.createElement("script");
		script.type="text/javascript";
		script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
		$("#gads-responsive-left").append(script);

		var script3 = '<script>(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-2098590497386911", enable_page_level_ads: true });</script>';
		$("#gads-responsive-left").append(script3);
	});
}