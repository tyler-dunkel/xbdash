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
	$("#gads-page-level").append(script);

	var pageAds = Session.get("pageAds");

	if (pageAds === undefined || pageAds === '') {
		var script2 = document.createElement("script");
		$("#gads-page-level").append(script2);
		$("#gads-page-level script:nth-child(2)").append("(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: 'ca-pub-2098590497386911', enable_page_level_ads: true });");
		Session.set("pageAds","loaded");
	}
}

Template.googleAdsResponsiveTop.rendered = function () {
	var script = document.createElement("script");
	script.async = true;
	script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	$("#gads-responsive-top").append(script);
}

Template.googleAdsResponsiveRight.rendered = function () {
	$('.content-template-1 #gads-responsive-right').affix({
		offset: {
			top: 200
		}
	});
	$('.content-template-2 #gads-responsive-right').affix({
		offset: {
			top: 500
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