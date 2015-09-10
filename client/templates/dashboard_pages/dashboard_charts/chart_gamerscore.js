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
			.x(function(d) { return d.date })    //Specify the data accessors.
			.y(function(d) { return d.total })
			.staggerLabels(false)    //Too many bars and not enough room? Try staggering labels.
			.tooltips(true)        //Don't show tooltips
			.showValues(true)       //...instead, show the bar value right on top of each bar.

		gamerscoreChart.xAxis
			.axisLabel('Date');

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

	// var nv = {};

	// var gamerscoreChart;

	// var oneMonth = moment().subtract(1, 'month').toDate();
	// var userId = Meteor.userId();
	// var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: { $gte: oneMonth } }, { sort: { progression: -1 }, limit: 50 }).fetch();
	// 	//return gamerscore.value;

	// console.log(userGamerscoreDataSet);

	// d3.json(userGamerscoreDataSet, function(data) {
	// 	var gamerscoreChart;

	// 	nv.addGraph(function() {
	// 		var gamerscoreChart = nv.models.cumulativeLineChart()
	// 			.x(function(d) { return d.progression; })
	// 			.y(function(d) {
	// 				var gamerscore = xbdAchievements.findOne({ _id: d.achievementId });
	// 				return gamerscore.value;
	// 			})
	// 			.color(d3.scale.category20().range())
	// 			.options({
	// 				transitionDuration: 300,
	// 				useInteractiveGuideline: true
	// 			});

	// 		gamerscoreChart.xAxis
	// 			.axisLabel('Date')
	// 			.tickFormat(function(d) {
	// 				return d3.time.format('%x')(new Date(d));
	// 			});

	// 		gamerscoreChart.yAxis
	// 			.tickFormat(d3.format('05d'));

	// 		d3.select('#gamerscore-chart svg').datum(
	// 				[{
	// 					key: 'Gamerscore',
	// 					values: userGamerscoreDataSet
	// 				}]
	// 			).call(gamerscoreChart);

	// 		nv.utils.windowResize(gamerscoreChart.update);

	// 		return gamerscoreChart;
	// 	});
	// });




	// var userId = Meteor.userId();
	// var margin = {top: 0, right: 0, bottom: 15, left: 25},
	// 	width = $(".chart-wrapper").width(),
	// 	height = 300;

	// var oneMonth = moment().subtract(1, 'month').toDate();
	// timeRangeToggle.set(oneMonth);

	// var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: {$gte: oneMonth} }, { sort: { progression: -1 }, limit: 50 }).fetch();

	// resizeGamerscoreChart = function resizeGamerscoreChart() {
	// // Find the new window dimensions
	// var margin = {top: 0, right: 0, bottom: 15, left: 25},
	// 	width = $(".chart-wrapper").width(),
	// 	height = 300;

	// var timeToggle = timeRangeToggle.get();
	// var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: {$gte: timeToggle} }, { sort: { progression: -1 }, limit: 50 }).fetch();

	// x.range([0, width - margin.left - margin.right]);
	// y.range([height - margin.bottom, 0]);

	// d3.select("#gamerscore-chart")
	// 	.attr("width", width)
	// 	.attr("height", height);

	// svg
	// 	.select(".x.axis")
	// 	.transition()
	// 	.call(xAxis);

	// svg
	// 	.select(".y.axis")
	// 	.transition()
	// 	.call(yAxis);

	// svg
	// 	.selectAll('path')
	// 	.attr("d", line(userGamerscoreDataSet));
	// }

	// // defines x as time scale
	// var x = d3.time.scale()
	// 	.range([0, width - margin.left - margin.right]);

	// var y = d3.scale.linear()
	// 	.range([height - margin.bottom, 0]);

	// // defines axes
	// var xAxis = d3.svg.axis()
	// 	.scale(x)
	// 	.orient("bottom")
	// 	.ticks(7);

	// var yAxis = d3.svg.axis()
	// 	.scale(y)
	// 	.orient("left")
	// 	.ticks(7);

	// // defines tick values
	// var line = d3.svg.line()
	// 	.x(function(d) {
	// 		return x(d.progression);
	// 	})
	// 	.y(function(d) {
	// 		var gamerscore = xbdAchievements.findOne({ _id: d.achievementId });
	// 		return y(gamerscore.value);
	// 	}).interpolate("basis");

	// var svg = d3.select("#gamerscore-chart")
	// 	.attr("width", width)
	// 	.attr("height", height)
	// 	.append("g")
	// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// svg.append("g")
	// 	.attr("class", "x axis")
	// 	.attr("transform", "translate(0," + 279 + ")");

	// svg.append("g")
	// 	.attr("class", "y axis")
	// 	.append("text")
	// 	.attr("transform", "rotate(-90)")
	// 	.attr("y", 6)
	// 	.attr("dy", ".71em")
	// 	.style("text-anchor", "end")
	// 	.text("Gamerscore");

	// var paths = svg.selectAll('path')
	//  	.data([userGamerscoreDataSet]);

	// x.domain(d3.extent(userGamerscoreDataSet, function(d) {
	// 	return d.progression;
	// }));


	// y.domain([0, d3.max(userGamerscoreDataSet, function(d) { 
	// 	var gamerscore = xbdAchievements.findOne({ _id: d.achievementId });
	// 	return gamerscore.value;
	// })]);

	// svg.select(".x.axis")
	// 	.transition()
	// 	.duration(500)
	// 	.call(xAxis);

	// svg.select(".y.axis")
	// 	.transition()
	// 	.duration(500)
	// 	.call(yAxis);

	// paths
	// 	.enter()
	// 	.append("svg:path")
	// 	.attr("class", "line")
	// 	.attr("id", "gamerscore-line")
	// 	.attr('d', line)
	// 	.attr("stroke", "green")
	// 	.attr("stroke-width", 3)
	// 	.attr("fill", "none");

	// paths
	// 	.exit()
	// 	.remove();

	// d3.select(window).on('resize.gamerscore', resizeGamerscoreChart);

	// // d3.select('.chart-wrapper').on('resize.two', resize);

	// this.autorun(function(computation) {

	// 	//remove the line so that it may be updated.
	// 	if (!computation.firstRun) {
	// 		d3.select("#gamerscore-line").remove();
	// 	}

	// 	//get the current value of the timeRangeToggle and query the db again with it. 
	// 	var timeToggle = timeRangeToggle.get();
	// 	var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: {$gte: timeToggle} }, { sort: { progression: -1 }, limit: 50 }).fetch();

	// 	var paths = svg.selectAll('path')
	// 	.data([userGamerscoreDataSet]).attr("class", "line");

	// 	// var line = d3.svg.line()
	// 	// 		.x(function(d) {
	// 	// 			return x(d.progression);
	// 	// 		})
	// 	// 		.y(function(d) {
	// 	// 			var gamerscore = xbdAchievements.findOne({ _id: d.achievementId });
	// 	// 			console.log(gamerscore.value);
	// 	// 			return y(gamerscore.value);
	// 	// 		}).interpolate("basis");

	// 	x.domain(d3.extent(userGamerscoreDataSet, function(d) {
	// 		return d.progression;
	// 	}));

	// 	y.domain([0, d3.max(userGamerscoreDataSet, function(d) { 
	// 		var gamerscore = xbdAchievements.findOne({ _id: d.achievementId });
	// 		return gamerscore.value;
	// 	})]);


	// 	//updates x axis
	// 	if (!computation.firstRun) {
	// 		svg.select(".x.axis")
	// 		.transition()
	// 		.duration(500)
	// 		.call(xAxis);

	// 		//updates y axis
	// 		svg.select(".y.axis")
	// 		.transition()
	// 		.duration(500)
	// 		.call(yAxis);

	// 		d3.select('#gamerscore-chart g')
	// 		.append("svg:path")
	// 		.attr("class", "line")
	// 		.attr("id", "gamerscore-line")
	// 		.attr("d", line(userGamerscoreDataSet))
	// 		.attr("stroke", "green")
	// 		.attr("stroke-width", 3)
	// 		.attr("fill", "none");
	// 	}
	// });
// }

// Template.gamerscoreChart.events({
	// "click #gamerscore-chart-recent-activity-button": function(e) {
	// 	console.log("fired");
	// 	if(!$(e.target).hasClass('active')) {
	// 		console.log("its going to 1 month");
	// 		$(e.target).addClass('active');
	// 		$('#gamerscore-chart-six-month-activity-button').removeClass('active');
	// 		oneMonth = moment().subtract(1, 'month').toDate();
	// 		timeRangeToggle.set(oneMonth);
	// 	}
	// },
	// "click #gamerscore-chart-six-month-activity-button": function(e) {
	// 	console.log("also fired");
	// 	if(!$(e.target).hasClass('active')) {
	// 		console.log("its going to 6 month");
	// 		$(e.target).addClass('active');
	// 		$('#gamerscore-chart-recent-activity-button').removeClass('active');
	// 		sixMonths = moment().subtract(6, 'month').toDate();
	// 		timeRangeToggle.set(sixMonths);
	// 	}
	// }
// });