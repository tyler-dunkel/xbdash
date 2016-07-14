Template.userBadges.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userBadges', gamertagSlug);
	this.subscribe('userWishlist', gamertagSlug);
	this.subscribe('userTrophyCase', gamertagSlug);
}

Template.userBadges.helpers({
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		return Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	},
	badge: function () {
		return xbdBadges.findOne({ userId: this._id });
	},
	wishes: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return userWishlists.find({ userId: user._id });
	},
	trophies: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return trophyCase.find({ userId: user._id });
	}
});

// Template.userWishlist.created = function() {
// 	var gamertagSlug = Router.current().params.gamertagSlug;
// 	this.subscribe('userWishlist', gamertagSlug);
// }

// Template.userWishlist.helpers({
// 	getUserGamertag: function () {
// 		var gamertagSlug = Router.current().params.gamertagSlug;
// 		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
// 		return user.gamercard.gamertag;
// 	},
// 	user: function () {
// 		var gamertagSlug = Router.current().params.gamertagSlug;
// 		return Meteor.users.findOne({ gamertagSlug: gamertagSlug });
// 	}
// });

// Template.userTrophyCase.created = function() {
// 	var gamertagSlug = Router.current().params.gamertagSlug;
// 	this.subscribe('userTrophyCase', gamertagSlug);
// }