var timeRangeToggle = new ReactiveVar();
var achievementsChart;

Template.achievementsChart.created = function() {
	var threeMonths = moment().subtract(3, 'month').toDate();
    timeRangeToggle.set(threeMonths);
    var self = this;
    self.subscribe('dashboardMainCharts', threeMonths);
}

Template.achievementsChartSvg.rendered = function() {
	var oneMonth = moment().subtract(1, 'month').toDate();
	var userId = Meteor.userId();
	var userAchievementsDataSet = userAchievements.find({ userId: userId, progression: { $gt: oneMonth } }, { sort: { progression: -1 }, limit: 100 }).fetch();
	var formattedAchievementData = formatAchievementData(userAchievementsDataSet);

	nv.addGraph(function() {
		achievementsChart = nv.models.lineChart()
			.margin({ left: 65, right: 40 })
			.x(function (d) { return d.date })
			.y(function (d) { return d.total })
			.showLegend(true)
			.showXAxis(true)
			.showYAxis(true)
			.forceY([0]);

		var d = new Date();
		var oneMonthAgo = d3.time.day.offset(new Date(), -14);

		achievementsChart.xAxis
			.axisLabel('Date')
			.tickFormat(function(d) { return d3.time.format('%b %d, %Y')(new Date(d)) });
			//.tickValues(d3.time.day.range(oneMonthAgo, d, 1));

		achievementsChart.yAxis
			.axisLabel('Achievements')
			.tickFormat(d3.format('d'));

		updateAchievementsChart(formattedAchievementData);

		return achievementsChart;
	});

	this.autorun(function (c) {
		var timeRange = timeRangeToggle.get();
		console.log("autorun ran for time range");
		if (!c.firstRun) {
			var userId = Meteor.userId();
			var userAchievementsDataSet = userAchievements.find({ userId: userId, progression: { $gt: timeRange} }, { sort: { progression: -1 }, limit: 100 }).fetch();
			var formattedAchievementData = formatAchievementData(userAchievementsDataSet);
			console.log("formatted data length: " + formattedAchievementData[0].values.length);
			updateAchievementsChart(formattedAchievementData);
		}
	});
}

Template.achievementsChartSvg.events({
 	"click #achievement-chart-recent-activity-button": function(e) {
        console.log("fired");
        if(!$(e.target).hasClass('active')) {
            console.log("its going to 1 month");
            $(e.target).addClass('active');
            $('#achievement-chart-three-month-activity-button').removeClass('active');

            oneMonth = moment().subtract(1, 'month').toDate();
            timeRangeToggle.set(oneMonth);
        }
    },
    "click #achievement-chart-three-month-activity-button": function(e) {
        console.log("also fired");
        if(!$(e.target).hasClass('active')) {
            console.log("its going to 6 month");
            $(e.target).addClass('active');
            $('#achievement-chart-recent-activity-button').removeClass('active');

            threeMonths = moment().subtract(3, 'month').toDate();
            timeRangeToggle.set(threeMonths);
        }
    }
});

Tracker.autorun(function() {
});

var updateAchievementsChart = function(formattedData) {
	d3.select('#achievements-chart svg').datum(formattedData).transition().duration(350).call(achievementsChart);
	nv.utils.windowResize(achievementsChart.update);
}

var formatAchievementData = function(dataSet) {
	var achievementDataArray = [];
	var groupedDates = _.groupBy(_.pluck(dataSet, 'progression'), function(date) {
		return moment(date).format('MM/DD/YY');
	});

	_.each(_.values(groupedDates), function(dates) {
		achievementDataArray.push({
			date: dates[0].getTime(),
			total: dates.length
		});
	});

	return [
	{
		key: 'Achievements',
		values: achievementDataArray,
		color: '#138013'
	}
	];
}