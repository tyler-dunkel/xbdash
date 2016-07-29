Template.googleAdsMedium.rendered = function() {
	$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
		var ads, adsbygoogle;
		ads = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle xbd-top-banner-ad" style="display: block;" data-ad-client="ca-pub-2014481178377974" data-ad-slot="9677223644" data-ad-format="auto"></ins>';
		$('.xbd-top-banner-ad').html(ads);
		adsbygoogle = window.adsbygoogle || [];
		window.onload = function() {
			return (adsbygoogle).push({});
		}
	});
};
 
Template.googleAdsResponsiveRight.rendered = function() {
	$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
		var ads, adsbygoogle;
		ads = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle xbd-right-banner-ad" style="display: block;" data-ad-client="ca-pub-2014481178377974" data-ad-slot="5107423240" data-ad-format="auto"></ins>';
		$('.xbd-right-banner-ad').html(ads);
		adsbygoogle = window.adsbygoogle || [];
		window.onload = function() {
			return (adsbygoogle).push({});
		}
	});
};

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