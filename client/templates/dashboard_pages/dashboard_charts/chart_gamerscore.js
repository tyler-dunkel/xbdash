var timeRangeToggle = new ReactiveVar();
var gamerscoreChart;

Template.gamerscoreChart.created = function() {
	var threeMonth = moment().subtract(3, 'month').toDate();
	var self = this;
	self.subscribe('dashboardMainCharts', threeMonth);
}

Template.gamerscoreChartSvg.rendered = function() {
	var oneMonth = moment().subtract(1, 'month').toDate();
	var userId = Meteor.userId();
	var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: { $gte: oneMonth } }, { sort: { progression: 1 }, limit: 300 }).fetch();
	var formattedGamerscoreData = formatGamerscoreData(userGamerscoreDataSet);

	nv.addGraph(function() {
		gamerscoreChart = nv.models.discreteBarChart()
			.margin({ left: 65, right: 40 })
			.x(function(d) { return d.date })
			.y(function(d) { return d.total })
			.staggerLabels(false)
			.tooltips(true)
			.showValues(true);

		gamerscoreChart.xAxis
			.axisLabel('Date')
			.tickFormat(function(d) { return d3.time.format('%b %d, %Y')(new Date(d)) });

		gamerscoreChart.yAxis
			.axisLabel('Gamerscore');

		d3.select('#gamerscore-chart svg')
			.datum(formattedGamerscoreData)
			.transition()
			.duration(350)
			.call(gamerscoreChart);

		updateGamerscoreChart(formattedGamerscoreData);

		return gamerscoreChart;
	});

	this.autorun(function (c) {
		var timeRange = timeRangeToggle.get();
		console.log("gamerscore chart ran for time range");
		if (!c.firstRun) {
			var userId = Meteor.userId();
			var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: { $gte: timeRange } }, { sort: { progression: 1 }, limit: 300 }).fetch();
			var formattedGamerscoreData = formatGamerscoreData(userGamerscoreDataSet);
			console.log("this is running");
			updateGamerscoreChart(formattedGamerscoreData);
		}
	});
}

Template.gamerscoreChartSvg.events({
	"click #gamerscore-chart-recent-activity-button": function(e) {
		console.log("fired");
		if(!$(e.target).hasClass('active')) {
			console.log("its going to 1 month");
			$(e.target).addClass('active');
			$('#gamerscore-chart-three-month-activity-button').removeClass('active');
			
			oneMonth = moment().subtract(1, 'month').toDate();
            timeRangeToggle.set(oneMonth);
		}
	},
	"click #gamerscore-chart-three-month-activity-button": function(e) {
		console.log("also fired");
		if(!$(e.target).hasClass('active')) {
			console.log("its going to 6 month");
			$(e.target).addClass('active');
			$('#gamerscore-chart-recent-activity-button').removeClass('active');

			threeMonths = moment().subtract(3, 'month').toDate();
            timeRangeToggle.set(threeMonths);
		}
	}
});

Tracker.autorun(function() {
});

var updateGamerscoreChart = function(formattedData) {
	d3.select('#gamerscore-chart svg').datum(formattedData).transition().duration(350).call(gamerscoreChart);
	nv.utils.windowResize(gamerscoreChart.update);
}

var formatGamerscoreData = function(dataSet) {
	var gamerscoreDataArray = [];
	var groupedValues = _.map(dataSet, function(d) {
		var date = moment(d.progression).format('MM/DD/YY');
		var achievementId = d.achievementId;
		var achievement = xbdAchievements.findOne({ _id: achievementId }, { fields: { progression: 1, value: 1 }});

		return {
			date: date,
			total: achievement.value
		};
	});

	var gamerscoreDataArray = _.reduce(groupedValues, function(prev, curr) {
	    var found = _.find(prev, function(el) { return el.date === curr.date; });
	    found ? (found.total += curr.total) : prev.push(_.clone(curr));
	    return prev;
	}, []);

	return [
	{
		key: 'Gamerscore',
		values: gamerscoreDataArray,
		color: '#138013'
	}
	];
}