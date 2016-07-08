Template.rightConfirmShelf.created = function() {
	this.removeId = ReactiveVar('');
	this.type = ReactiveVar('');
	this.isOpen = false;
	var gamertagSlug = Meteor.user().gamertagSlug;
	this.subscribe('userWishlist', gamertagSlug);
}


Template.rightConfirmShelf.rendered = function() {
	var self = this;
	$('#menu-open-button').on('click', function(e) {
		$('.app-header-fixed').toggleClass('show-menu');
		// if (self.isOpen) {
		// 	$('.app-header-fixed').removeClass('show-menu');
		// } else {
		// 	$('.app-header-fixed').addClass('show-menu');
		// }
		// self.isOpen = !self.isOpen;
	});

	$('.app-content').on('click',function(e) {
		console.log('fired app content click');
		var	target = e.target;
		console.log($(e.target).closest('.menu-wrap').length);
		if( $('.app-header-fixed').hasClass('show-menu') && target !== $('#menu-open-button' )[0] && !$(e.target).closest('.menu-wrap').length) {
			$('.app-header-fixed').toggleClass('show-menu');
			// self.isOpen = !self.isOpen;
		}
	});
}

Template.rightConfirmShelf.helpers({
	user: function() {
		return Meteor.user();
	},
	wish: function() {
		var wishes = userWishlists.find({userId: Meteor.userId()});
		console.log(wishes.fetch());
		return wishes;
	},
	debug: function() {
		console.log(this);
	},
	isGame: function() {
		if (this.type === 'game') {
			return true;
		}
	},
	gameName: function() {
		var game = xbdGames.findOne({_id: this.relationId});
		if (game) {
			return game.name;
		} else {
			return 'N/A';
		}
	},
	achievementName: function() {
		var achievement = xbdAchievements.findOne({_id: this.relationId});
		if (achievement) {
			return acheivement.name;
		} else {
			return 'N/A';
		}
	}
});

Template.rightConfirmShelf.events({
	"click .swap-item": function(e) {
		console.log(this);
		$(e.currentTarget).addClass('acitve');
		Template.instance().removeId.set(this.relationId);
		Template.instance().type.set(this.type);
	},
	"click .submit-swap": function(e) {
		var tempInstance = Template.instance(),
			doc = xbdGames.findOne({_id: Template.instance().data.gameId}),
			removeId = tempInstance.removeId.get(),
			type = tempInstance.type.get();
		if (removeId === '') {
			return;
		}
		console.log(tempInstance);
		//console.log(doc);
		Meteor.call('confirmAddToWishlist', type, doc, removeId, function(err, res) {
			tempInstance.removeId.set('');
			console.log(err);
			console.log(res);
		});
	},
	"click #menu-close-button": function() {
		console.log('fired close');
		var tempInstance = Template.instance();

			$('.app-header-fixed').toggleClass('show-menu');
	}
});