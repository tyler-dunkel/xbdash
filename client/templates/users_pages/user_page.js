Template.userProfilePage.created = function() {
	DocHead.removeDocHeadAddedTags();

	this.autorun(function() {
		var gamertagSlug = Router.current().params.gamertagSlug;
		// if (!gamertagSlug || gamertagSlug === '' && Meteor.user()) {
		// 	gamertagSlug = Meteor.user().gamertagSlug;
		// } else {
		// 	gamertagSlug = Router.current().params.gamertagSlug;
		// }
		Meteor.subscribe('userProfile', gamertagSlug);
	});
}

Template.userProfilePage.helpers({
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		return Meteor.users.find({ gamertagSlug: gamertagSlug });
	}
});

Template.userProfilePage.events({
	"click .personal-tab": function() {
		Meteor.setTimeout(function() {
		  	$('.specialty-badges').slick({
				"arrows": true,
				"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
				"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
				"focusOnSelect": true,
				"edgeFriction": 0.20,
				"infinite": false,
				"mobileFirst": true,
				"rows": 1,
				"slidesPerRow": 2,
				"slidesToShow": 2,
				"swipeToSlide": true,
				responsive: [
				{
					breakpoint: 768,
					settings: {
						infinite: true
					}
				}
				]
			});
			$('.game-badges').slick({
				"arrows": true,
				"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
				"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
				"draggable": true,
				"focusOnSelect": true,
				"edgeFriction": 0.20,
				"infinite": false,
				"mobileFirst": true,
				"rows": 1,
				"slidesPerRow": 4,
				"slidesToShow": 4,
				"swipeToSlide": true,
				"responsive": [
				{
					breakpoint: 1024,
					settings: {
						"slidesPerRow": 3,
						"slidesToShow": 3,
						infinite: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						"slidesPerRow": 2,
						"slidesToShow": 2,
						infinite: true
					}
				}
				]
			});
			$('.gamerscore-badges').slick({
				"arrows": true,
				"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
				"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
				"draggable": true,
				"focusOnSelect": true,
				"edgeFriction": 0.20,
				"infinite": false,
				"mobileFirst": true,
				"rows": 1,
				"slidesPerRow": 6,
				"slidesToShow": 6,
				"swipeToSlide": true,
				"responsive": [
				{
					breakpoint: 1024,
					settings: {
						"slidesPerRow": 3,
						"slidesToShow": 3,
						infinite: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						"slidesPerRow": 2,
						"slidesToShow": 2,
						infinite: true
					}
				}
				]
			});
		}, 5);
	}
});

Template.userDocHead.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	var userGamertag, userGamerscore, userMotto, userProfilePageImage, userProfilePageDescription, userProfilePageTitle;
	
	userProfilePageImage = "/img/gamerpic-default.jpg";

	if (user && user.gamercard) {
		userProfilePageDescription = user.gamercard.gamertag + " | Gamerscore: " + user.gamercard.gamerscore + " | " + user.gamercard.motto;
		userProfilePageImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + user.gamercard.gamerpicLargeSslImagePath;
		userProfilePageTitle = user.gamercard.gamertag + " | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	}
	if (user && user.xboxProfile) {
		userProfilePageDescription = user.xboxProfile.gamertag + " | Gamerscore: " + user.xboxProfile.gamerscore + " | Manage achievements. Complete games. See results.";
		userProfilePageImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + user.xboxProfile.gameDisplayPicRaw;
		userProfilePageTitle = user.xboxProfile.gamertag + " | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	}

	var userProfilePageUrl = window.location.href;

	var userProfilePageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": userProfilePageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": userProfilePageDescription },
		{ "property": "og:image", "content": userProfilePageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": userProfilePageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": userProfilePageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": userProfilePageUrl },
		{ "name": "twitter:title", "content": userProfilePageTitle },
		{ "name": "twitter:description", "content": userProfilePageDescription },
		{ "name": "twitter:image:src", "content": userProfilePageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": userProfilePageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(userProfilePageTitle);

	for(var i = 0; i < userProfilePageMeta.length; i++) {
		DocHead.addMeta(userProfilePageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.userProfileArea.helpers({
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		return Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	},
	userGamerPic: function () {
		var image = "/img/xbdash_greenicon.png";
		if (this && this.gamercard && this.gamercard.gamerpicLargeSslImagePath) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(this.gamercard.gamerpicLargeSslImagePath);
		}
		if (this && this.xboxProfile) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(this.xboxProfile.gameDisplayPicRaw);
		}
		return image;
	},
	userGamertag: function () {
		if (this && this.gamercard) {
			return this.gamercard.gamertag;
		}
	},
	userMotto: function () {
		if (this && this.gamercard) {
			return this.gamercard.motto;
		}
	},
	createdAtDate: function () {
		return moment(this.createdAt).format('MMMM YYYY');
	},	
	getGamerscore: function () {
		if (this && this.gamercard) {
			return this.gamercard.gamerscore;
		}
	},
	getBio: function () {
		if (this && this.gamercard) {
			console.log(this.gamercard.bio);
			return this.gamercard.bio;
		}
	}
});

Template.userRankArea.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	// if (!gamertagSlug || gamertagSlug === '' && Meteor.user()) {
	// 	gamertagSlug = Meteor.user().gamertagSlug;
	// } else {
	// 	gamertagSlug = Router.current().params.gamertagSlug;
	// }
	this.subscribe('userRanks', gamertagSlug);
}

Template.userRankArea.helpers({
	user: function() {
		var gamertagSlug = Router.current().params.gamertagSlug;
		return Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	},
	usersDailyRank: function() {
		var userLb = userLeaderboards.findOne({ userId: this._id });
		if (userLb && userLb.dailyRank && userLb.dailyRank.rank > 0) {
			return userLb.dailyRank.rank;
		}
		return '---';
	},
	usersOverallRank: function() {
		var userLb = userLeaderboards.findOne({ userId: this._id });
		if (userLb && userLb.overallRank > 0) {
			return userLb.overallRank;
		}
		return '---';
	}
});