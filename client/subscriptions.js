Tracker.autorun(function() {
	if (Meteor.user()) {
		var user = Meteor.user();
		if (typeof user.profile.xuid === 'undefined') {
			return subMana.subscribe('userSocialServices');
		}
	}
});