Template.contestAdsResponsiveRight.rendered = function () {
	$('#banner-affix').affix({
		offset: {
			top: 200
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

Template.googleAdsResponsiveTop.rendered = function () {
	var script = document.createElement("script");
	script.async = true;
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-top").append(script);
}

Template.googleAdsResponsiveRight.rendered = function () {
	$('#gads-responsive-right').affix({
		offset: {
			top: 200
		}
	});
	var script = document.createElement("script");
	script.async = true;
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-right div").append(script);
}

Template.googleAdsResponsiveLeft.rendered = function () {
	var script = document.createElement("script");
	script.type="text/javascript";
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-left").append(script);

	if ( $('.blog-post.news') ) {
		$('#gads-responsive-left').appendTo(".blog-post.news p:nth-child(4)");
	}
}