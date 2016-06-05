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

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var leaderboardsMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Review your daily rank by gamerscore, the top all-time users by gamerscore, the top users by completed achievements, and the top users by completed games." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Review your daily rank by gamerscore, the top all-time users by gamerscore, the top users by completed achievements, and the top users by completed games." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/share-default.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "See Today's Top Leaders - XBdash" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "Review your daily rank by gamerscore, the top all-time users by gamerscore, the top users by completed achievements, and the top users by completed games." },
		{ "name": "twitter:title", "content": "See Today's Top Leaders - XBdash" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("See Today's Top Leaders | XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < leaderboardsMeta.length; i++) {
		DocHead.addMeta(leaderboardsMeta[i]);;
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