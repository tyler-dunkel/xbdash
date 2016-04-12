var timeRangeToggle = new ReactiveVar();
var gamerscoreChart;

Template.gamerscoreChart.created = function() {
	var thirtyDays = moment().subtract(30, 'days').toDate();
	var self = this;
	self.subscribe('dashboardMainCharts', thirtyDays);
}

Template.gamerscoreChartSvg.rendered = function() {
	var fifteenDays = moment().subtract(15, 'days').toDate();
	var userId = Meteor.userId();
	var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: { $gte: fifteenDays } }, { sort: { progression: 1 }, limit: 100 }).fetch();
	var formattedGamerscoreData = formatGamerscoreData(userGamerscoreDataSet);

	nv.addGraph(function() {
		gamerscoreChart = nv.models.discreteBarChart()
			.margin({ right: 20, bottom: 65, left: 65 })
			.x(function(d) { return d.date })
			.y(function(d) { return d.total })
			.valueFormat(d3.format(',f'))
			.staggerLabels(false)
			.tooltips(true)
			.showValues(true)
			.noData("Your data will update when your Gamerscore changes.");

		gamerscoreChart.xAxis
			// .axisLabel('Date')
			.tickFormat(function(d) { return d3.time.format('%b %d, %Y')(new Date(d)) })
			.rotateLabels(-45);

		gamerscoreChart.yAxis
			.axisLabel('Gamerscore')
			.tickFormat(d3.format(',f'));

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
		if (!c.firstRun) {
			var userId = Meteor.userId();
			var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: { $gte: timeRange } }, { 
			sort: { progression: 1 }, limit: 300 }).fetch();
			var formattedGamerscoreData = formatGamerscoreData(userGamerscoreDataSet);
			updateGamerscoreChart(formattedGamerscoreData);
		}
	});

	Meteor.setTimeout(function() {
		var fifteenDays = moment().subtract(15, 'days').toDate();
		timeRangeToggle.set(fifteenDays);
	}, 5000);
}

Template.gamerscoreChartSvg.events({
	"click #gamerscore-chart-recent-activity-button": function(e) {
		if(!$(e.target).hasClass('active')) {
			$(e.target).addClass('active');
			$('#gamerscore-chart-thirty-days-activity-button').removeClass('active');
			
            fifteenDays = moment().subtract(15, 'days').toDate();
			timeRangeToggle.set(fifteenDays);
		}
	},
	"click #gamerscore-chart-thirty-days-activity-button": function(e) {
		if(!$(e.target).hasClass('active')) {
			$(e.target).addClass('active');
			$('#gamerscore-chart-recent-activity-button').removeClass('active');

			thirtyDays = moment().subtract(30, 'days').toDate();
            timeRangeToggle.set(thirtyDays);
		}
	}
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