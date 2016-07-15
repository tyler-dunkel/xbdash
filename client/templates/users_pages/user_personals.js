Template.userPersonal.created = function() {
	var gamertagSlug;
	if (!gamertagSlug || gamertagSlug === '' && Meteor.user()) {
		gamertagSlug = Meteor.user().gamertagSlug;
	} else {
		gamertagSlug = Router.current().params.gamertagSlug;
	}
	this.subscribe('userBadges', gamertagSlug);
}

Template.userPersonal.helpers({
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		return Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	},
	badge: function () {
		return xbdBadges.findOne({ userId: this._id });
	}
});

Template.userWishlist.created = function() {
	var gamertagSlug;
	if (!gamertagSlug || gamertagSlug === '' && Meteor.user()) {
		gamertagSlug = Meteor.user().gamertagSlug;
	} else {
		gamertagSlug = Router.current().params.gamertagSlug;
	}
	this.subscribe('userWishlist', gamertagSlug);
}

Template.userWishlist.helpers({
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		if (!gamertagSlug || gamertagSlug === '') {
			gamertagSlug = Meteor.user().gamertagSlug;
		}
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	isGame: function() {
		console.log(this.type);
		if (this.type === 'game') {
			return true;
		}
	},
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		if (!gamertagSlug || gamertagSlug === '') {
			gamertagSlug = Meteor.user().gamertagSlug;
		}
		return Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	},
	currentUserEntry: function() {
		if (this.userId === Meteor.userId()) {
			return true;
		} 
	},
	wishes: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		if (!gamertagSlug || gamertagSlug === '') {
			gamertagSlug = Meteor.user().gamertagSlug;
		}
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return userWishlists.find({ userId: user._id });
	},
	gameName: function() {
		var game = xbdGames.findOne({ _id: this.relationId });
		console.log(game);
		if (game) {
			return game.name;
		} else {
			return 'Not here';
		}
	},
	gameImage: function() {
		var game = xbdGames.findOne({ _id: this.relationId }),
			gameDetail = gameDetails.findOne({gameId: this.relationId });
			image = "https://www.xbdash.com/img/game-default.jpg";

		if (game.platform === 'Xenon') {
			console.log('got here');
			gameDetail.gameArt.forEach(function(art) {
				if (art.Purpose === 'BoxArt' && art.Width === 219) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/h_32,c_scale/" + encodeURIComponent(art.Url);
				}
			});
		}
		if (game.platform === 'Durango') {
			console.log('got here instead');
			gameDetail.gameArt.forEach(function(art) {
				if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(art.Url);
				}
			});
		}
		console.log(image);
		return image;
	},
	achievementName: function() {
		console.log('this helper');
		var achievement = xbdAchievements.findOne({ _id: this.relationId });
		if (achievement) {
			return achievement.name;
		} else {
			return 'N/A';
		}
	},
	achievementImage: function() {
		console.log('fired for it');
		var image = "https://www.xbdash.com/img/achievement-default.jpg";
		var achievement = xbdAchievements.findOne({ _id: this.relationId });
		if (achievement && achievement.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_1366,h_768/" + encodeURIComponent(achievement.mediaAssets);
		}
		return image;
	}
});

Template.userWishlist.events({
	"click .list-group-item": function() {
		if (this.type === 'game') {
			var game = xbdGames.findOne({_id: this.relationId});
			console.log(game.slug);
			Router.go('game', {slug: game.slug});
		} else {
			var achievement = xbdAchievements.findOne({_id: this.relationId});
			Router.go('achievement', {slug: achievement.slug});
		}
	},
	'click .remove-from-wishlist': function(e) {
		var self = this,
			doc;
		if (this.type === 'game') {
			doc = xbdGames.findOne({ _id: this.relationId });
		} else {
			doc = xbdAchievements.findOne({_id: this.relationId});
		}

		if (!doc) {
			return;
		}

		Meteor.call('removeFromWishlist', this.type, doc, function(err, res) {
			if (err) return;
			if (res) {
				swal({
					title: res.title,
					text: res.reason,
					type: res.status
				});
				return;
			}
		});
	}
});

Template.userTrophyCase.created = function() {
	var gamertagSlug;
	if (!gamertagSlug || gamertagSlug === '' && Meteor.user()) {
		gamertagSlug = Meteor.user().gamertagSlug;
	} else {
		gamertagSlug = Router.current().params.gamertagSlug;
	}
	this.subscribe('userTrophyCase', gamertagSlug);
}

Template.userTrophyCase.helpers({
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		if (!gamertagSlug || gamertagSlug === '') {
			gamertagSlug = Meteor.user().gamertagSlug;
		}
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		if (!gamertagSlug || gamertagSlug === '') {
			gamertagSlug = Meteor.user().gamertagSlug;
		}
		return Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	},
	currentUserEntry: function() {
		if (this.userId === Meteor.userId()) {
			return true;
		} 
	},
	trophies: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		if (!gamertagSlug || gamertagSlug === '') {
			gamertagSlug = Meteor.user().gamertagSlug;
		}
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return trophyCase.find({ userId: user._id });
	},
	isGame: function() {
		console.log(this.type);
		if (this.type === 'game') {
			return true;
		}
	},
	gameName: function() {
		var game = xbdGames.findOne({ _id: this.relationId });
		if (game) {
			return game.name;
		} else {
			return 'N/A';
		}
	},
	gameImage: function() {
		var game = xbdGames.findOne({ _id: this.relationId }),
			gameDetail = gameDetails.findOne({gameId: this.relationId });
			image = "https://www.xbdash.com/img/game-default.jpg";

		if (game.platform === 'Xenon') {
			gameDetail.gameArt.forEach(function(art) {
				if (art.Purpose === 'BoxArt' && art.Width === 219) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/h_32,c_scale/" + encodeURIComponent(art.Url);
				}
			});
		}
		if (game.platform === 'Durango') {
			gameDetail.gameArt.forEach(function(art) {
				if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(art.Url);
				}
			});
		}

		return image;
	},
	achievementName: function() {
		console.log('this helper');
		var achievement = xbdAchievements.findOne({ _id: this.relationId });
		if (achievement) {
			return achievement.name;
		} else {
			return 'N/A';
		}
	},
	achievementImage: function() {
		console.log('fired for it');
		var image = "https://www.xbdash.com/img/achievement-default.jpg";
		var achievement = xbdAchievements.findOne({ _id: this.relationId });
		if (achievement && achievement.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_1366,h_768/" + encodeURIComponent(achievement.mediaAssets);
		}
		return image;
	}
});

Template.userTrophyCase.events({
	"click .list-group-item": function() {
		if (this.type === 'game') {
			var game = xbdGames.findOne({_id: this.relationId});
			console.log(game.slug);
			Router.go('game', {slug: game.slug});
		} else {
			var achievement = xbdAchievements.findOne({_id: this.relationId});
			Router.go('achievement', {slug: achievement.slug});
		}
	},
	'click .remove-from-trophy-case': function(e) {
		var self = this,
			doc;
		if (this.type === 'game') {
			doc = xbdGames.findOne({ _id: this.relationId });
		} else {
			doc = xbdAchievements.findOne({_id: this.relationId});
		}

		if (!doc) {
			return;
		}

		Meteor.call('removeFromTrophyCase', this.type, doc, function(err, res) {
			if (err) return;
			if (res) {
				swal({
					title: res.title,
					text: res.reason,
					type: res.status
				});
				return;
			}
		});
	}
});