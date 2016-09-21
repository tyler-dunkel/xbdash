Template.timeAttackContestTemplate.created = function() {
}

Template.timeAttackContestTemplate.rendered = function() {
}

Template.timeAttackContestTemplate.helpers({
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

Template.timeAttackContestTemplate.events({
});