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
			return { status: 'success', title: 'Wishlist Updated!', reason: 'Game has been added to your wishlist.' };
		}
		if (type && type === 'achievement') {
			if (userWishlists.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', title: 'Oops!', reason: 'Achievement is already in your wishlist.' };
			}
			userWishlists.insert({ userId: user._id, type: 'achievement', relationId: doc._id });
			return { status: 'success', title: 'Wishlist Updated!', reason: 'Achievement has been added to your wishlist.' };
		}
	},
	removeFromWishlist: function(type, doc) {
		var user = Meteor.user();
		if (type && type === 'game') {
			userWishlists.remove({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', title: 'Removed!', reason: 'Game has been removed from your wishlist!' };
		}
		if (type && type === 'achievement') {
			console.log('remove achievement');
			userWishlists.remove({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', title: 'Removed!', reason: 'Achievement has been removed from your wishlist!' };
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
			return { status: 'success', title: 'Swap successful!', reason: 'Your wishlist was updated.', error: null };
		}
		if (type && type === 'achievement') {
			console.log(doc);
			userWishlists.insert({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', title: 'Swap successful!', reason: 'Your wishlist was updated.', error: null };
		}
	},
	addToTrophyCase: function(type, doc) {
		var user = Meteor.user();
		var trophyCaseCount = trophyCase.find({ userId: user._id}).count();
		if (trophyCaseCount >= 10) {
			return { status: 'warning', title: 'Trophy case is full!', error: null };
		}
		if (type && type === 'game') {
			if (trophyCase.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', title: 'Oops!', reason: 'Game is already in your trophy case.' };
			}
			trophyCase.insert({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', title: 'Trophy Case Updated!', reason: 'Game was added to your trophy case!', error: null };
		}
		if (type && type === 'achievement') {
			if (trophyCase.find({ userId: user._id, relationId: doc._id }).count() > 0) {
				return { status: 'error', title: 'Oops!', reason: 'Achievement is already in your trophy case.' };
			}
			trophyCase.insert({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', title: 'Trophy Case Updated!', reason: 'Achievement was added to your trophy case!', error: null };
		}
	},
	removeFromTrophyCase: function(type, doc) {
		var user = Meteor.user();
		if (type && type === 'game') {
			trophyCase.remove({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', title: 'Removed!', reason: 'Game has been removed from your trophy case!' };
		}
		if (type && type === 'achievement') {
			console.log('remove achievement');
			trophyCase.remove({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', title: 'Removed!', reason: 'Achievement has been removed from your trophy case!' };
		}
	},
	confirmAddToTrophyCase: function(type, doc, removeDocId) {
		var user = Meteor.user();
		trophyCase.remove({ userId: user._id, relationId: removeDocId});
		if (type && type === 'game') {
			trophyCase.insert({ userId: user._id, type: 'game', relationId: doc._id });
			return { status: 'success', title: 'Trophy Case Updated!', reason: 'Your trophy case was updated.', error: null };
		}
		if (type && type === 'achievement') {
			trophyCase.insert({ userId: user._id, type: type, relationId: doc._id });
			return { status: 'success', title: 'Trophy Case Updated!', reason: 'Your trophy case was updated.', error: null };
		}
	}
});