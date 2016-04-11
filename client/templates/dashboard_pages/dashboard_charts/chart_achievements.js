var timeRangeToggle = new ReactiveVar();
var achievementsChart;

Template.achievementsChart.created = function() {
	var thirtyDays = moment().subtract(30, 'days').toDate();
	var self = this;
	self.subscribe('dashboardMainCharts', thirtyDays);
}

Template.achievementsChartSvg.rendered = function() {
	var fifteenDays = moment().subtract(15, 'days').toDate();
	var userId = Meteor.userId();
	var userAchievementsDataSet = userAchievements.find({ userId: userId, progression: { $gt: fifteenDays } }, { sort: { progression: -1 }, limit: 100 }).fetch();
	var formattedAchievementData = formatAchievementData(userAchievementsDataSet);

	nv.addGraph(function() {
		achievementsChart = nv.models.lineChart()
			.margin({ right: 20, bottom: 65, left: 65 })
			.x(function (d) { return d.date })
			.y(function (d) { return d.total })
			.showLegend(true)
			.showXAxis(true)
			.showYAxis(true)
			.forceY([0])
			.noData("Your data will update when you unlock an achievement.");

		var d = new Date();
		var oneMonthAgo = d3.time.day.offset(new Date(), -14);
		
		achievementsChart.xAxis
			//.axisLabel('Date')
			.tickFormat(function(d) { return d3.time.format('%b %d, %Y')(new Date(d)) })
			.rotateLabels(-45);

		achievementsChart.yAxis
			.axisLabel('Achievements')
			.tickFormat(d3.format('d'));

		updateAchievementsChart(formattedAchievementData);

		return achievementsChart;
	});

	this.autorun(function (c) {
		var timeRange = timeRangeToggle.get();
		if (!c.firstRun) {
			var userId = Meteor.userId();
			userAchievementsDataSet = userAchievements.find({ userId: userId, progression: { $gt: timeRange} }, { sort: { progression: -1 }, limit: 300 }).fetch();
			var formattedAchievementData = formatAchievementData(userAchievementsDataSet);
			updateAchievementsChart(formattedAchievementData);
		}
	});
	Meteor.setTimeout(function() {
		var fifteenDays = moment().subtract(15, 'days').toDate();
		timeRangeToggle.set(fifteenDays);
	}, 5000);
}

Template.achievementsChartSvg.events({
 	"click #achievement-chart-recent-activity-button": function(e) {
		if(!$(e.target).hasClass('active')) {
			$(e.target).addClass('active');
			$('#achievement-chart-thirty-days-activity-button').removeClass('active');

			fifteenDays = moment().subtract(15, 'days').toDate();
			timeRangeToggle.set(fifteenDays);
		}
	},
	"click #achievement-chart-thirty-days-activity-button": function(e) {
		if(!$(e.target).hasClass('active')) {
			$(e.target).addClass('active');
			$('#achievement-chart-recent-activity-button').removeClass('active');

			thirtyDays = moment().subtract(30, 'days').toDate();
			timeRangeToggle.set(thirtyDays);
		}
	}
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