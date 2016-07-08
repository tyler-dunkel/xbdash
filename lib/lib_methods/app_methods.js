Meteor.methods({
	addToWishlist: function(type, doc) {
		var user = Meteor.user();
		var wishlistCount = userWishlists.find({ userId: user._id}).count();
		if (wishlistCount >= 10) {
			return { status: 'warning', title: 'Wishlist is full!', error: null };
		}
		if (type && type === 'game') {
			if (userWishlists.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', title: 'Oops!', reason: 'Game is already in your wishlist.' };
			}
			userWishlists.insert({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', title: 'Added!', reason: 'Game has been added to your wishlist.' };
		}
		if (type && type === 'achievement') {
			if (userWishlists.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', title: 'Oops!', reason: 'Achievement is already in your wishlist.' };
			}
			userWishlists.insert({ userId: user._id, type: 'achievement', relationId: doc._id });
			return { status: 'success', title: 'Added!', reason: 'Achievement has been added to your wishlist.' };
		}
	},
	removeFromWishlist: function(type, doc) {
		var user = Meteor.user();
		if (type && type === 'game') {
			userWishlists.remove({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', title: 'Removed!', reason: 'Game has been removed from wishlist!' };
		}
		if (type && type === 'achievement') {
			userWishlists.remove({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', title: 'Removed!', reason: 'Achievement has been removed from wishlist!' };
		}
	},
	confirmAddToWishlist: function(type, doc, removeDocId) {
		var user = Meteor.user();
		console.log('removing from wishlist');
		console.log('removing this id: ' + removeDocId);
		userWishlists.remove({ userId: user._id, relationId: removeDocId});
		if (type && type === 'game') {
			console.log('adding to wishlist');
			userWishlists.insert({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', error: null };
		}
		if (type && type === 'achievement') {
			userWishlists.insert({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', error: null };
		}
	}
});