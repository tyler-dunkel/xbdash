Template.leaderboardTemplate.created = function() {
	switch(this.data.boardType) {
		case 'dailyRank':
			this.subscribe('dailyRanks');
			break;
		case 'completedAchievements':
			this.subscribe('completedAchievements');
			break;
		case 'completedGames':
			this.subscribe('completedGames');
			break;
		default:
			this.subscribe('overallRanks');
			return;
	}

	DocHead.removeDocHeadAddedTags();

	var leaderboardPageDescription = "Review your daily rank by gamerscore, the top all-time users by gamerscore, the top users by completed achievements, and the top users by completed games.";
	var leaderboardPageImage = "https://www.xbdash.com/img/leaderboards-share.jpg";
	var leaderboardPageTitle = "See Today's Top Leaders | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var leaderboardPageUrl = window.location.href;

	var leaderboardPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": leaderboardPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": leaderboardPageDescription },
		{ "property": "og:image", "content": leaderboardPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": leaderboardPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": leaderboardPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": leaderboardPageUrl },
		{ "name": "twitter:title", "content": leaderboardPageTitle },
		{ "name": "twitter:description", "content": leaderboardPageDescription },
		{ "name": "twitter:image:src", "content": leaderboardPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": leaderboardPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(leaderboardPageTitle);

	for(var i = 0; i < leaderboardPageMeta.length; i++) {
		DocHead.addMeta(leaderboardPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.leaderboardTemplate.helpers({
	boardTitle: function() {
		var boardType = Template.instance().data.boardType;
		switch(boardType) {
			case 'dailyRank':
				return 'Top Gamerscore Today';
				break;
			case 'completedAchievements':
				return 'Completed Achievements';
				break;
			case 'completedGames':
				return 'Completed Games';
				break;
			default:
				return 'Top All-Time Gamerscore';
		}
	},
	checkCurrentUserForLB: function() {
		var count;
		var user = Meteor.user();
		var boardType = Template.instance().data.boardType;
		switch(boardType) {
			case 'dailyRank':
				count = userLeaderboards.find({ 'userId': user._id, 'dailyRank.rank': { $gte: 1 } }).count();
				if (count > 0) return true;
				return false;
				break;
			case 'completedAchievements': 
				count = userLeaderboards.find({ 'userId': user._id, 'completedAchievements.rank': { $gte: 1 } }).count();
				if (count > 0) return true;
				return false;
				break;
			case 'completedGames':
				count = userLeaderboards.find({ 'userId': user._id, 'completedGames.rank': { $gte: 1 } }).count();
				if (count > 0) return true;
				return false;
				break;
			default:
				return true;
		}
	},
	defaultBoardText: function() {
		var boardType = Template.instance().data.boardType;
		switch(boardType) {
			case 'dailyRank':
				return "Unlock an achievement today<br/>for a daily rank.";
				break;
			case 'completedAchievements': 
				return "Unlock an achievement<br/>for a rank.";
				break;
			case 'completedGames':
				return "Complete a game's achievements<br />for a rank.";
				break;
			default:
				return "Start hunting for achievements<br />for a rank.";
		}
	},
	checkForLB: function() {
		var count;
		var boardType = Template.instance().data.boardType;
		switch(boardType) {
			case 'dailyRank':
				count = userLeaderboards.find({ 'dailyRank.rank': { $gte: 1 } }).count();
				if (count > 0) return true;
				return false;
				break;
			case 'completedAchievements': 
				count = userLeaderboards.find({ 'completedAchievements.rank': { $gte: 1 } }).count();
				if (count > 0) return true;
				return false;
				break;
			case 'completedGames':
				count = userLeaderboards.find({ 'completedGames.rank': { $gte: 1 } }).count();
				if (count > 0) return true;
				return false;
				break;
			default:
				return true;
		}
	},
	rank: function() {
		var boardType = Template.instance().data.boardType;
		switch(boardType) {
			case 'dailyRank':
				return userLeaderboards.find({
					'dailyRank.value': { $gt: 1 }
				}, {
					sort: { 'dailyRank.rank': 1 },
					limit: 25
				});
				break;
			case 'completedAchievements':
				return userLeaderboards.find({
					'completedAchievements.count': { $gt: 1 }
				}, {
					sort: { 'completedAchievements.rank': 1 },
					limit: 25
				});
				break;
			case 'completedGames':
				return userLeaderboards.find({
					'completedGames.count': { $gt: 1 }
				}, {
					sort: { 'completedGames.rank': 1 },
					limit: 25
				});
				break;
			default:
				return userLeaderboards.find({ overallRank: { $gt: 0 } }, {
					sort: { overallRank: 1 },
					limit: 25
				});
		}
	},
	getUser: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.gamercard.gamertag;
	},
	getUserImage: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath && (user.gamercard.gamerpicLargeSslImagePath !== '')) {
			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	},
	getUserRank: function() {
		var boardType = Template.parentData(1).boardType;
		console.log('user rank log ' + boardType);
		switch(boardType) {
			case 'dailyRank':
				return this.dailyRank.rank;
				break;
			case 'completedAchievements':
				return this.completedAchievements.rank;
				break;
			case 'completedGames':
				return this.completedGames.rank;
				break;
			default:
				return this.overallRank;
		}
	},
	getUserRankValue: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		var boardType = Template.parentData(1).boardType;
		console.log('rank value log ' + boardType);
		switch(boardType) {
			case 'dailyRank':
				return this.dailyRank.value;
				break;
			case 'completedAchievements':
				return this.completedAchievements.count;
				break;
			case 'completedGames':
				return this.completedGames.count;
				break;
			default:
				return user.gamercard.gamerscore;
		}
	}
});

Template.leaderboardTemplate.events({
	'click .profile-link': function(e) {
		e.preventDefault();
		var user = Meteor.users.findOne({ _id: this.userId });
		Router.go('userPage', { gamertagSlug: user.gamertagSlug });
	}
});

Template.currentUserLeaderboard.created = function() {
	this.subscribe('currentUserLeaderboard');
}

Template.currentUserLeaderboard.helpers({
	getCurrentUser: function() {
		var user = Meteor.user();
		return user.gamercard.gamertag;
	},
	getCurrentUserImage: function() {
		var user = Meteor.user();
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	},
	getCurrentUserLBRank: function() {
		var user = Meteor.user();
		var boardType = Template.instance().data.boardType;
		var userLb = userLeaderboards.findOne({ userId: user._id });
		switch(boardType) {
			case 'dailyRank':
				return userLb.dailyRank.rank;
				break;
			case 'completedAchievements': 
				return userLb.completedAchievements.rank;
				break;
			case 'completedGames':
				return userLb.completedGames.rank;
				break;
			default:
				return userLb.overallRank;
		}
	},
	getCurrentUserLBCount: function() {
		var user = Meteor.user();
		var boardType = Template.instance().data.boardType;
		var userLb = userLeaderboards.findOne({ userId: user._id });
		switch(boardType) {
			case 'dailyRank':
				return userLb.dailyRank.value;
				break;
			case 'completedAchievements': 
				return userLb.completedAchievements.count;
				break;
			case 'completedGames':
				return userLb.completedGames.count;
				break;
			default:
				return user.gamercard.gamerscore;
		}
	}
});

Template.currentUserShareButtons.helpers({
	getUrl: function () {
		var slug = Router.current().params.slug;
		return window.location.href;
	},
	getTitle: function() {
		var user = Meteor.user();
		var boardType = Template.instance().data.boardType;
		var userLb = userLeaderboards.findOne({ userId: user._id });
		switch(boardType) {
			case 'dailyRank':
				var userRank = userLb.dailyRank.rank;
				return "I'm ranked " + userRank + " for Top Gamerscore Today!";
				break;
			case 'completedAchievements': 
				var userRank = userLb.completedAchievements.rank;
				return "I'm ranked " + userRank + " for Completed Achievements!";
				break;
			case 'completedGames':
				var userRank = userLb.completedGames.rank;
				return "I'm ranked " + userRank + " for Completed Games!";
				break;
			default:
				var userRank = userLb.overallRank;
				return "I'm ranked " + userRank + " for All-Time Gamerscore!";
		}
	},
	getShortDescription: function () {
		return "Review your daily rank by gamerscore, the top all-time users by gamerscore, the top users by completed achievements, and the top users by completed games.";
	},
	getShareImage: function () {
		return "https://www.xbdash.com/img/leaderboards-share.jpg";
	},
	getHashTags: function() {
		return "xbox,xbdash,gamerscore,achievement,leader";
	}
});