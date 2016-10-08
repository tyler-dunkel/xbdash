Template.achievementCompletionContestTemplate.created = function() {
}

Template.achievementCompletionContestTemplate.rendered = function() {
}

Template.achievementCompletionContestTemplate.helpers({
	contest: function () {
		return xbdContests.findOne({ "contestToken": Router.current().params.contestToken });
	},
	getPlace: function(index) {
		if (index === 0) return 'Grand Prize';
		if (index === 1) return 'Second Place Prize';
		if (index === 2) return 'Third Place Prize';
	},
	countEntries: function() {
		var entryCount = Template.instance().entryCount.get();
		if (entryCount) {
			return numberFormatter(entryCount);
		} else {
			return '0';
		}
	},
	getLocalStartDate: function() {
		return moment(this.startDate).local().format('MMMM Do YYYY, h:mm a');
	},
	getStartDate: function() {
		return moment.utc(this.startDate).format('MMMM Do YYYY, h:mm a');
	},
	getLocalEndDate: function() {
		return moment(this.endDate).local().format('MMMM Do YYYY, h:mm a');
	},
	getEndDate: function() {
		return moment.utc(this.endDate).format('MMMM Do YYYY, h:mm a');
	},
	getLocalAwardDate: function() {
		return moment(this.awardDate).local().format('MMMM Do YYYY, h:mm a');
	},
	getAwardDate: function() {
		return moment.utc(this.awardDate).format('MMMM Do YYYY, h:mm a');
	},
	contestPrice: function() {
		return '5 Credits';
	}
});

Template.achievementCompletionContestTemplate.events({
});

Template.achievementsList.created = function() {
	var contestToken = Router.current().params.contestToken;
	var contest = xbdContests.findOne({ "contestToken": contestToken });
	this.autorun(function() {
		Meteor.subscribe('completeAchievementsData', contest.data.achievementIdArray);
	});
}

Template.achievementsList.rendered = function() {
}

Template.achievementsList.helpers({
	achievements: function () {
		return xbdAchievements.find({ _id: {$in: this.data.achievementIdArray} }, {
			sort: {
				value: 1,
				name: 1
			}
		});
	},
	chkProgress: function () {
		var user = Meteor.user();
		if (user) {
			if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
				var userAchievement = userAchievements.findOne({ userId: user._id, achievementId: this._id });
				if (userAchievement && userAchievement.progressState) {
					return true;
				}
			}
		}
	},
	chkPlatform: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		if (game.platform === 'Xenon') {
			return 'thumb-md2';
		}
	},
	achievementImage: function () {
		var image = "/img/achievement-default.jpg";
		if (this.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(this.mediaAssets);
		}
		return image;
	},
	achievementClass: function () {
		var userPercentage = this.userPercentage;
		var achievementClass = "xbd";
		if (userPercentage >= 51 && userPercentage <= 100) {
			achievementClass = "common";
		}
		if (userPercentage >= 26 && userPercentage <= 50) {
			achievementClass = "rare";
		}
		if (userPercentage >= 11 && userPercentage <= 25) {
			achievementClass = "epic";
		}
		if (userPercentage >= 0 && userPercentage <= 10) {
			achievementClass = "legendary";
		}
		return achievementClass;
	}
});

Template.achievementsList.events({
	'click .show-more a': function() {
		var linkText = $('.show-more a').text();

		if (linkText === 'Show more achievements') {
			linkText = 'Show less achievements';
			$('.achievement-content').removeClass('hide-content');
			$('.achievement-content').addClass('show-content');
		} else {
			linkText = 'Show more achievements';
			$('.achievement-content').removeClass('show-content');
			$('.achievement-content').addClass('hide-content');
		};

		console.log(linkText);

		$('.show-more a').text(linkText);
	}
});