Template.dashboard.rendered = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ rel: "icon", type: "image/x-icon", href: "https://www.xbdash.com/img/favicon.ico" },
		{ rel: "canonical", href: window.location.href }
	];

	var dashboardMeta = [
		{ name: "description", content: "Review your achievements per day, gamerscore per day, and your game genre distribution." },
		{ property: "fb:app_id", content: Meteor.settings.public.facebookAppId },
		{ property: "og:description", content: "Review your achievements per day, gamerscore per day, and your game genre distribution." },
		{ property: "og:image", content: "https://www.xbdash.com/img/share-default.jpg" },
		{ property: "og:locale", content: "en_US" },
		{ property: "og:site_name", content: "XBdash" },
		{ property: "og:title", content: "Welcome to Your Dashboard - XBdash" },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: window.location.href },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:description", content: "Review your achievements per day, gamerscore per day, and your game genre distribution." },
		{ name: "twitter:title", content: "Welcome to Your Dashboard - XBdash" },
		{ name: "twitter:image", content: "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("Welcome to Your Dashboard - XBdash");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < dashboardMeta.length; i++) {
		DocHead.addMeta(dashboardMeta[i]);;
	}
}

Template.dashboard.rendered = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
};

Template.dashboard.helpers({
    chkBuilding: function() {
        var user = Meteor.user();
        if (user.gamertagScanned.status === 'building') return true;
    }
});