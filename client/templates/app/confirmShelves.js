Template.wishlistPopup.created = function() {
	this.removeId = ReactiveVar('');
	this.type = ReactiveVar(Router.current().route.getName());
	this.isOpen = false;
	var gamertagSlug = Meteor.user().gamertagSlug;
	this.subscribe('userWishlist', gamertagSlug);
}


Template.wishlistPopup.rendered = function() {
	var self = this;
	// $('.add-to-wish-list').on('click', function(e) {
	// 	$('.app-header-fixed').toggleClass('show-wishlist');
	// });

	$('.app-content').on('click',function(e) {
		var	target = e.target;
		if( $('.app-header-fixed').hasClass('show-wishlist') && target !== $('.add-to-wish-list' )[0] && !$(e.target).closest('.wishlist-popup').length) {
			console.log('fired to hide');
			$('.app-header-fixed').toggleClass('show-wishlist');
		}
	});
}

Template.wishlistPopup.helpers({
	user: function() {
		return Meteor.user();
	},
	wish: function() {
		var wishes = userWishlists.find({ userId: Meteor.userId() });
		console.log(wishes.fetch());
		return wishes;
	},
	debug: function() {
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
	acheivementImage: function() {
		var image = "https://www.xbdash.com/img/achievement-default.jpg";
		var achievement = xbdAchievements.findOne({ _id: this.relationId });
		if (achievement && achievement.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_1366,h_768/" + encodeURIComponent(this.mediaAssets);
		}
		return image;
	}
});

Template.wishlistPopup.events({
	"click .swap-item": function(e) {
		e.preventDefault();
		console.log('fired');
		$('.swap-item').removeClass('active');
		$(e.currentTarget).addClass('active');
		console.log(this);
		Template.instance().removeId.set(this.relationId);
	},
	"click .submit-swap": function(e) {
		//console.log('fired');
		var tempInstance = Template.instance(),
			doc,
			removeId = tempInstance.removeId.get(),
			type = tempInstance.type.get();

		console.log(removeId);
		if (removeId === '') {
			return;
		}
		console.log('running swap');
		if (type === 'achievement') {
			doc = xbdAchievements.findOne({ _id: tempInstance.data._id });
		} else {
			doc = xbdGames.findOne({ _id: tempInstance.data.gameId });
		}
		console.log(doc);
		Meteor.call('confirmAddToWishlist', type, doc, removeId, function(err, res) {
			tempInstance.removeId.set('');
			$('.app-header-fixed').toggleClass('show-wishlist');
			swal({
				title: res.title,
				text: res.reason,
				type: res.status
			});
		});
	},
	"click #menu-close-button": function() {
		console.log('fired close');
		var tempInstance = Template.instance();

		$('.app-header-fixed').toggleClass('show-wishlist');
	}
});

Template.trophyCasePopup.created = function() {
	this.removeId = ReactiveVar('');
	this.type = ReactiveVar(Router.current().route.getName());
	this.isOpen = false;
	var gamertagSlug = Meteor.user().gamertagSlug;
	this.subscribe('userTrophyCase', gamertagSlug);
}


Template.trophyCasePopup.rendered = function() {
	var self = this;
	// $('.add-to-wish-list').on('click', function(e) {
	// 	$('.app-header-fixed').toggleClass('show-trophy-case');
	// });

	$('.app-content').on('click',function(e) {
		var	target = e.target;
		if( $('.app-header-fixed').hasClass('show-trophy-case') && target !== $('.add-to-trophy-case' )[0] && !$(e.target).closest('.trophy-case-popup').length) {
			$('.app-header-fixed').toggleClass('show-trophy-case');
		}
	});
}

Template.trophyCasePopup.helpers({
	user: function() {
		return Meteor.user();
	},
	trophy: function() {
		var wishes = trophyCase.find({ userId: Meteor.userId() });
		console.log(wishes.fetch());
		return wishes;
	},
	debug: function() {
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
	acheivementImage: function() {
	}
});

Template.trophyCasePopup.events({
	"click .swap-item": function(e) {
		e.preventDefault();
		console.log('fired');
		$('.swap-item').removeClass('active');
		$(e.currentTarget).addClass('active');
		console.log(this);
		Template.instance().removeId.set(this.relationId);
	},
	"click .submit-swap": function(e) {
		//console.log('fired');
		var tempInstance = Template.instance(),
			doc,
			removeId = tempInstance.removeId.get(),
			type = tempInstance.type.get();

		console.log(removeId);
		if (removeId === '') {
			return;
		}
		console.log('running swap');
		if (type === 'achievement') {
			doc = xbdAchievements.findOne({ _id: tempInstance.data._id });
		} else {
			doc = xbdGames.findOne({ _id: tempInstance.data.gameId });
		}
		console.log(doc);
		Meteor.call('confirmAddToTrophyCase', type, doc, removeId, function(err, res) {
			tempInstance.removeId.set('');
			$('.app-header-fixed').toggleClass('show-trophy-case');
			swal({
				title: res.title,
				text: res.reason,
				type: res.status
			});
		});
	},
	"click #menu-close-button": function() {
		console.log('fired close');
		var tempInstance = Template.instance();

		$('.app-header-fixed').toggleClass('show-trophy-case');
	}
});