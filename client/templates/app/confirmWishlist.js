Template.confirmWishlist.created = function() {
	var gamertagSlug = Meteor.user().gamertagSlug;
	this.subscribe('userWishlist', gamertagSlug);
}

Template.confirmWishlist.helpers({
	user: function() {
		return Meteor.user();
	},
	wish: function() {
		return userWishlists.find({userId: Meteor.userId()});
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
		return game.name;
	},
	achievementName: function() {
		var achievement = xbdAchievements.findOne({_id: this.relationId});
		return acheivement.name;
	}
});

Template.confirmWishlist.events({
	"click .wishlist-item": function(e) {
		console.log('hello');
		e.currentTarget.addClass('active');
	}
})