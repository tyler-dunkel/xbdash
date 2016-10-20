Template.contestAdsResponsiveRight.rendered = function () {
	$('#xbd-right-banner-ad').affix({
		offset: {
			top: 110
		}
	});
}

Template.googleAdsMedium.rendered = function () {
	var script = document.createElement("script");
	script.type="text/javascript";
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-top").append(script);
}

Template.googleAdsResponsiveLeft.rendered = function () {
	var script = document.createElement("script");
	script.type="text/javascript";
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-left").append(script);
}

Template.googleAdsResponsiveRight.rendered = function () {
	var script = document.createElement("script");
	script.type="text/javascript";
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-right").append(script);
}