Template.googleAdsMedium.onRendered = function() {
	$.getScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
		var ads, adsbygoogle;
		ads = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2014481178377974" data-ad-slot="9677223644" data-ad-format="auto"></ins>';
		$('.responsive-top-banner').html(ads);
		return (adsbygoogle = window.adsbygoogle || []).push({});
	});
};

Template.googleAdsResponsiveRight.onRendered = function() {
	$.getScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
		var ads, adsbygoogle;
		ads = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2014481178377974 data-ad-slot="5107423240" data-ad-format="auto"></ins>';
		$('.responsive-right-banner').html(ads);
		return (adsbygoogle = window.adsbygoogle || []).push({});
	});
};