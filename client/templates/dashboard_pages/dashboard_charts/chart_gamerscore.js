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
			.staggerLabels(false)
			.tooltips(true)
			.showValues(true);

		gamerscoreChart.xAxis
			// 	.axisLabel('Date')
			.tickFormat(function(d) { return d3.time.format('%b %d, %Y')(new Date(d)) })
			.rotateLabels(-45);

		gamerscoreChart.yAxis
			.axisLabel('Gamerscore');

		d3.select('#gamerscore-chart svg')
			.datum(formattedGamerscoreData)
			.transition()
			.duration(350)
			.call(gamerscoreChart);

		// d3.selectAll("#gamerscore-chart .nv-x .nv-axis text")
		// 	.attr("transform", function(d) {
		// 		return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height*2 + ")";
		// 	});

		updateGamerscoreChart(formattedGamerscoreData);

		return gamerscoreChart;
	});

	this.autorun(function (c) {
		var timeRange = timeRangeToggle.get();
		console.log("gamerscore chart ran for time range");
		if (!c.firstRun) {
			var userId = Meteor.userId();
			var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: { $gte: timeRange } }, { 
			sort: { progression: 1 }, limit: 300 }).fetch();
			var formattedGamerscoreData = formatGamerscoreData(userGamerscoreDataSet);
			updateGamerscoreChart(formattedGamerscoreData);
		}
	});

	Meteor.setTimeout(function() {
		console.log("timeout function");
		var fifteenDays = moment().subtract(15, 'days').toDate();
		timeRangeToggle.set(fifteenDays);
	}, 5000);
}

Template.gamerscoreChartSvg.events({
	"click #gamerscore-chart-recent-activity-button": function(e) {
		console.log("fired");
		if(!$(e.target).hasClass('active')) {
			console.log("its going to 15 days");
			$(e.target).addClass('active');
			$('#gamerscore-chart-thirty-days-activity-button').removeClass('active');
			
            fifteenDays = moment().subtract(15, 'days').toDate();
			timeRangeToggle.set(fifteenDays);
		}
	},
	"click #gamerscore-chart-thirty-days-activity-button": function(e) {
		console.log("also fired");
		if(!$(e.target).hasClass('active')) {
			console.log("its going to 30 days");
			$(e.target).addClass('active');
			$('#gamerscore-chart-recent-activity-button').removeClass('active');

			thirtyDays = moment().subtract(30, 'days').toDate();
            timeRangeToggle.set(thirtyDays);
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