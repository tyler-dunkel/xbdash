var achievementLimit = new ReactiveVar();

Template.achievementsShowMoreApp.created = function() {
	console.log('this fired');
	var achievementTier = Router.current().params.tier,
	validVals = ['epic', 'legendary', 'common', 'rare'];
	console.log(achievementTier);
	if (_.indexOf(validVals, achievementTier) === -1) {
		Router.go('achievementsPage');
	} else {
		this.tier = achievementTier;
	}
}

Template.achievementsShowMoreApp.helpers({
	'achievementTier': function() {
		return Template.instance().tier;
	},
	'achievementPercentage': function() {
		var c = Template.instance().tier;
		if (c === 'epic') {
			return '11 to 25 percent';
		}
		if (c === 'legendary') {
			return '0 to 10 percent';
		}
		if (c === 'common') {
			return '51 to 100 percent';
		}
		if (c === 'rare') {
			return '26 to 50 percent';
		}
	}
});

Template.achievementsShowMoreSection.created = function() {
	var limit, self = this;
	achievementLimit.set(25);
	this.autorun(function() {
		limit = achievementLimit.get();
		Meteor.subscribe('achievementShowMore', {limit: limit, 
		tier: self.data.tier });
	});
}

Template.achievementsShowMoreSection.rendered = function() {
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

Template.achievementsShowMoreSection.helpers({
	'achievementList': function() {
		return xbdAchievements.find({}, {
			sort: { userPercentage: -1 },
			limit: achievementLimit.get()
		}).fetch();
	},
	'hasMoreResults': function() {
		var achievementLimitCurrent = achievementLimit.get();
		var xbdAcheivementCount = xbdAchievements.find({}).count();
		return ! (xbdAcheivementCount < achievementLimitCurrent);
	}
});

function showMoreVisible() {
	var threshold, target = $("#hasMoreResults");
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - target.height();
	if (target.offset().top < threshold) {
		console.log(target.data);
		if (!target.data("visible")) {
			target.data("visible", true);
			achievementLimit.set(achievementLimit.get() + 9);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}

