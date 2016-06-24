Template.userActivity.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userActivity', gamertagSlug);
}

Template.userActivity.helpers({
	chkUserActivity: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var count = recentActivity.find({ userId: user._id }).count();
		if (count > 0) return true;
		return false;
	},
	activity: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userActivity = recentActivity.findOne({ userId: user._id });
		if (userActivity.activityList) {
			return userActivity.activityList;
		} else {
			return [];
		}
	},
	getActivityImage: function () {
		var imageUri = this.contentImageUri;
		return imageUri;
	},
	getStartTime: function () {
		return moment(this.startTime).calendar();
	}
});

Template.userAchievements.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userAchievements', gamertagSlug);
}

Template.userAchievements.helpers({
	chkUserAchievements: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var count = userAchievements.find({ userId: user._id }).count();
		if (count > 0) return true;
		return false;
	},
	userAchievement: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userAchis = userAchievements.find({ userId: user._id });
		return userAchis;
	},
	achievementSlug: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		return achievement.slug;
	},
	getAchievementImage: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		var image = "https://www.xbdash.com/img/achievement-default.jpg";

		if (achievement.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fill,w_40,h_40/" + encodeURIComponent(achievement.mediaAssets);;
		}

		return image;
	},
	getAchievementName: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		return achievement.name;
	},
	getUnlockedDate: function () {
		return moment(this.progression).calendar();
	},
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	getGameName: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		var game = xbdGames.findOne({ _id: achievement.gameId });
		return game.name;
	},
	getAchievementValue: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		return achievement.value;
	}
});

Template.userGames.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userGames', gamertagSlug);
}

Template.userGames.helpers({
	chkUserGames: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var count = userGames.find({ userId: user._id }).count();
		if (count > 0) return true;
		return false;
	},
	userGame: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userGame = userGames.find({ userId: user._id });
		return userGame;
	},
	gameSlug: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		return game.slug;
	},
	getGameImage: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		var gameDets = gameDetails.findOne({ gameId: this.gameId });
		var image = "/img/game-default.jpg";

		if (game.platform === 'Xenon') {
			gameDets.gameArt.forEach(function(art) {
				if (art.Purpose === 'BoxArt' && art.Width === 219) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/c_fill,w_40,h_55/" + encodeURIComponent(art.Url);
				}
			});
		}
		if (game.platform === 'Durango') {
			gameDets.gameArt.forEach(function(art) {
				if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/c_fill,w_40,h_55/" + encodeURIComponent(art.Url);
				}
			});
		}

		return image;
	},
	getGameName: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		return game.name;
	},
	getUnlockedDate: function () {
		return moment(this.lastUnlock).calendar();
	},
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	}
});

Template.userClips.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userClips', gamertagSlug);
	this.counter = 0;
}

Template.userClips.rendered = function() {
	$('body').click(function(e) {
		if ($(e.target).parents('.clip-container').size() || $(e.target).hasClass('modal-content') || $(e.target).parents(".modal-content").size()) {
		} else {
			$('#clips-modal').modal('hide');
			$('#clips-modal .modal-body .carousel-inner').empty();
		}
	});
}

Template.userClips.helpers({
	chkClips: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var gameClip = gameClips.find({ userId: user._id });
		var gameClipCount = gameClip.count();
		if (gameClipCount > 0) return true;
		return false;
	},
	clip: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var currentTime = moment().utc().format();
		var clips = gameClips.find({
					userId: user._id
				}, {
					sort: { "datePublished": -1 }
				}).fetch();
		var validClips = [];
		clips.forEach(function(clip) {
			if (clip.savedByUser) {
				if (clip.gameClipUris[2].expiration > currentTime) {
					validClips.push(clip);
				}
			} else {
				if (clip.gameClipUris[0].expiration > currentTime) {
					validClips.push(clip);
				}
			}
		});
		return validClips;
	},
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	getLargeThumbnail: function () {
		var imageUri;
		this.thumbnails.forEach(function(thumbs) {
			if (thumbs.thumbnailType === "Large") {
				imageUri = thumbs.uri;
				imageUri = imageUri.replace("http", "https");
			}
		});
		return imageUri;
	},
	getClipUri: function () {
		var clipUri;
		this.gameClipUris.forEach(function(clips) {
			if (clips.uriType === "Download") {
				clipUri = clips.uri;
				clipUri = clipUri.replace("http", "https");
			}
		});
		return clipUri;
	}
});

Template.userClips.events({
	'click .clips-container .row .large': function(e) {
		$('#clips-modal .modal-body .carousel-inner').empty();

		$('.clips-container .row .large').each(function(index) {
			$(this).attr('data-slide', String(index + 1));
		});

		var image = $(e.currentTarget).attr('src');
		var video = $(e.currentTarget).attr('data-video');
		var dataSlide = $(e.currentTarget).attr('data-slide');

		$('#clips-modal .modal-body .carousel-inner').append('<video poster="' + image + '" data-slide="' + dataSlide + '" autoplay " preload="auto" class="xbd-tech" style="width:100%;"><source src="' + video + '" type="video/mp4"></video>');

		$('#clips-modal').modal('show');
	},
	'click #clips-modal .close': function() {
		$('#clips-modal .modal-body .carousel-inner').empty();
	},
	'click #clips-modal [data-dismiss="modal"]': function() {
		$('#clips-modal .modal-body .carousel-inner').empty();
	},
	'click .carousel-control.left': function() {
		var index = $('.xbd-tech').attr('data-slide');
		if (index === '1') {
			return;
		}
		var nextIndex = String(index - 1);
		$('#clips-modal .modal-body .carousel-inner').empty();
		var nextSlideSel = '[data-slide="' + nextIndex + '"]';
		var image = $(nextSlideSel).attr('src');
		var video = $(nextSlideSel).attr('data-video');
		var dataSlide = $(nextSlideSel).attr('data-slide');
		$('#clips-modal .modal-body .carousel-inner').append('<video poster="' + image + '" data-slide="' + dataSlide + '" autoplay preload="auto" class="xbd-tech" style="width:100%;"><source src="' + video + '" type="video/mp4"></video>');
	},
	'click .carousel-control.right': function() {
		var index = $('.xbd-tech').attr('data-slide');
		var clipCount = $('.clip-container').length;
		console.log(clipCount);
		if (index === String(clipCount)) {
			return;
		}
		var nextIndex = parseInt(index) + 1;
		$('#clips-modal .modal-body .carousel-inner').empty();
		var nextSlideSel = '[data-slide="' + nextIndex + '"]';
		var image = $(nextSlideSel).attr('src');
		var video = $(nextSlideSel).attr('data-video');
		var dataSlide = $(nextSlideSel).attr('data-slide');
		$('#clips-modal .modal-body .carousel-inner').append('<video poster="' + image + '" data-slide="' + dataSlide + '" autoplay preload="auto" class="xbd-tech" style="width:100%;"><source src="' + video + '" type="video/mp4"></video>');
	}
});

Template.userCaptures.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userCaptures', gamertagSlug);
	this.counter = 0;
}

Template.userCaptures.helpers({
	chkCaptures: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var imageCapture = screenShots.find({ userId: user._id });
		var imageCount = imageCapture.count();
		if (imageCount > 0) return true;
		return false;
	},
	capture: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var imageCapture = screenShots.find({ userId: user._id });
		return imageCapture;
	},
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	getLargeThumbnail: function () {
		var imageUri;
		this.thumbnails.forEach(function(thumbs) {
			if (thumbs.thumbnailType === "Large") {
				imageUri = thumbs.uri;
				imageUri = imageUri.replace("http", "https");
			}
		});
		return imageUri;
	}

});

Template.userCaptures.events({
	'click .captures-container .row .large': function(e) {
		$('#captures-modal .modal-body .carousel-inner').empty();

		$('.captures-container .row .large').each(function(index) {
			$(this).attr('data-cap-slide', String(index + 1));
		});

		var image = $(e.currentTarget).attr('src');
		var dataSlide = $(e.currentTarget).attr('data-cap-slide');

		$('#captures-modal .modal-body .carousel-inner').append('<img src="' + image + '" data-cap-slide="' + dataSlide + '" />');

		$('#captures-modal').modal('show');
	},
	'click #captures-modal .close': function() {
		$('#captures-modal .modal-body .carousel-inner').empty();
	},
	'click #captures-modal [data-dismiss="modal"]': function() {
		$('#captures-modal .modal-body .carousel-inner').empty();
	},
	'click .carousel-control.left': function() {
		var index = $('.carousel-inner img').attr('data-cap-slide');
		if (index === '1') {
			return;
		}
		var nextIndex = String(index - 1);
		$('#captures-modal .modal-body .carousel-inner').empty();
		var nextSlideSel = '[data-cap-slide="' + nextIndex + '"]';
		var image = $(nextSlideSel).attr('src');
		var dataSlide = $(nextSlideSel).attr('data-cap-slide');
		$('#captures-modal .modal-body .carousel-inner').append('<img src="' + image + '" data-cap-slide="' + dataSlide + '" />');
	},
	'click .carousel-control.right': function() {
		var index = $('.carousel-inner img').attr('data-cap-slide');
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var imageCapture = screenShots.find({ userId: user._id });
		if (index === String(imageCapture.count())) {
			return;
		}
		var nextIndex = parseInt(index) + 1;
		$('#captures-modal .modal-body .carousel-inner').empty();
		var nextSlideSel = '[data-cap-slide="' + nextIndex + '"]';
		var image = $(nextSlideSel).attr('src');
		var dataSlide = $(nextSlideSel).attr('data-cap-slide');
		$('#captures-modal .modal-body .carousel-inner').append('<img src="' + image + '" data-cap-slide="' + dataSlide + '" />');
	}
});