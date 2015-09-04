var timeRangeToggle = new ReactiveVar();

Template.achievementsChart.created = function() {
	var oneMonth = moment().subtract(1, 'month').toDate();
    timeRangeToggle.set(oneMonth);
    var self = this;
    this.autorun(function() {
    	var dateRange = timeRangeToggle.get();
    	self.subscribe('dashboardMainCharts', dateRange);
    });
}

Template.achievementsChartSvg.rendered = function() {
	var achievementsChart;

	var oneMonth = moment().subtract(1, 'month').toDate();
	var userId = Meteor.userId();
	var userAchievementsDataSet = userAchievements.find({ userId: userId, progression: { $gt: oneMonth } }, { sort: { progresion: -1 }, limit: 50 }).fetch();

	var formattedAchievementData = formatAchievementData(userAchievementsDataSet);

	console.log(formattedAchievementData);

	nv.addGraph(function() {
		achievementsChart = nv.models.lineChart()
			.margin({ left: 25 })
			.showLegend(true)
			.showXAxis(true)
			.showYAxis(true)
			.options({
				transitionDuration: 300,
				useInteractiveGuideline: true
			});

		achievementsChart.xAxis
			.axisLabel('Date')
			.tickFormat(d3.format('d'));
			//.tickFormat(function(d) { return d3.time.format('%m/%d/%Y')(new Date(d)) });

		achievementsChart.yAxis
			.axisLabel('Achievements')
			.tickFormat(d3.format('d'));

		d3.select('#achievements-chart svg').datum(formattedAchievementData).call(achievementsChart);

		nv.utils.windowResize(achievementsChart.update);

		return achievementsChart;
	});

	this.autorun(function () {
		achievementsChart = nv.models.lineChart()
			.margin({ left: 25 })
			.showLegend(true)
			.showXAxis(true)
			.showYAxis(true)
			.options({
				transitionDuration: 300,
				useInteractiveGuideline: true
			});

		var oneMonth = moment().subtract(1, 'month').toDate();
		var userId = Meteor.userId();
		var userAchievementsDataSet = userAchievements.find({ userId: userId, progression: { $gt: oneMonth } }, { sort: { progresion: -1 }, limit: 50 }).fetch();
		var formattedAchievementData = formatAchievementData(userAchievementsDataSet);

		d3.select('#achievements-chart svg').datum(formattedAchievementData).call(achievementsChart);

		achievementsChart.update;
	});

	// var margin = {top: 0, right: 0, bottom: 15, left: 25},
	// width = $(".chart-wrapper").width(),
	// height = 300;

	// var oneMonth = moment().subtract(1, 'month').toDate();
	// timeRangeToggle.set(oneMonth);

	// //collect the data and arrange it for the first time on render
	// var userId = Meteor.userId();
	// var achievementData = new Array();
	// var userAchievementsDataSet = userAchievements.find({ userId: userId, progression: {$gt: oneMonth} }, { sort: { progression: -1 }, limit: 50 }).fetch();
	// console.log(userAchievementsDataSet);
	// var groupedDates = _.groupBy(_.pluck(userAchievementsDataSet, 'progression'), function(date) {
	// 			return moment(date).format("MMM D"); // May 22
	// });

	// //push the correct objects into the achievementData array to pass to d3
	// _.each(_.values(groupedDates), function(dates) {
	// 	achievementData.push({
	// 		date: dates[0],
	// 		total: dates.length
	// 	});
	// });

	// resizeAchievementChart = function resizeAchievementChart() {
	// //Find the new window dimensions
	// var margin = {top: 0, right: 0, bottom: 15, left: 25},
	// 		width = $(".chart-wrapper").width(),
	// 		height = 300;

	// 	var achievementData = new Array();
	// 	var timeToggle = timeRangeToggle.get();
	// 	var userAchievementsDataSet = userAchievements.find({ userId: userId, progression: {$gt: timeToggle} }, { sort: { progression: -1 }, limit: 50 }).fetch();
	// 	var groupedDates = _.groupBy(_.pluck(userAchievementsDataSet, 'progression'), function(date) {
	// 				return moment(date).format("MMM D"); // May 22
	// 			});

	// 			//push the correct objects into the achievementData array to pass to d3
	// 	_.each(_.values(groupedDates), function(dates) {
	// 		achievementData.push({
	// 			date: dates[0],
	// 			total: dates.length
	// 		});
	// 	});

	// 	x.range([0, width - margin.left - margin.right]);
	// 	y.range([height - margin.bottom, 0]);

	// 	d3.select("#achievements-chart")
	// 		.attr("width", width)
	// 		.attr("height", height);

	// 	svg
	// 		.select(".x.axis")
	// 		.transition()
	// 		.call(xAxis);

	// 	svg
	// 		.select(".y.axis")
	// 		.transition()
	// 		.call(yAxis);

	// 	svg
	// 		.selectAll('path')
	// 		.attr("d", line(achievementData));
	// }

	// // defines x as time scale
	// var x = d3.time.scale()
	// 		.range([0, width - margin.left - margin.right]);

	// var y = d3.scale.linear()
	// 		.range([height - margin.bottom, 0]);

	// // defines axes
	// var xAxis = d3.svg.axis()
	// 			.scale(x)
	// 			.orient("bottom")
	// 			.ticks(7);

	// var yAxis = d3.svg.axis()
	// 			.scale(y)
	// 			.orient("left")
	// 			.ticks(7);

	// // defines tick values
	// var line = d3.svg.line()
	// 			.x(function(d) {
	// 				return x(d.date);
	// 			})
	// 			.y(function(d) {
	// 				return y(d.total);
	// 			}).interpolate("cardinal");

	// //create the chart for the first time
	// var svg = d3.select("#achievements-chart")
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
	// 	.text("Achievements");

	// var paths = svg.selectAll('path')
	// 		 			.data([achievementData]);

	// x.domain(d3.extent(achievementData, function(d) {
	// 			return d.date;
	// 		}));

	// y.domain([0, d3.max(achievementData, function(d) {
	// 	return d.total + 1;
	// })]);

	// //updates x axis
	// svg.select(".x.axis")
	// 			.transition()
	// 			.duration(500)
	// 			.call(xAxis);

	// //updates y axis
	// svg.select(".y.axis")
	// 			.transition()
	// 			.duration(500)
	// 			.call(yAxis);

	// paths
	// 			.enter()
	// 			.append("svg:path")
	// 			.attr("class", "line")
	// 			.attr('d', line)
	// 			.attr("stroke", "green")
	// 			.attr("id", "achievement-line")
	//          .attr("stroke-width", 3)
	//          .attr("fill", "none");

	// paths
	// 			.exit()
	// 			.remove();

	// d3.select(window).on('resize.achievements', resizeAchievementChart);

	// //d3.select('.chart-wrapper').on('resize.two', resize);

	// this.autorun(function(comp) {
	// 	var userId = Meteor.userId();
	// 	var achievementData = new Array();
	// 	var timeToggle = timeRangeToggle.get();

	// 	if (!comp.firstRun) {
	// 		d3.select('#achievement-line').remove();
	// 		var userAchievementsDataSet = userAchievements.find({ userId: userId, progression: {$gte: timeToggle} }, { sort: { progression: -1 }, limit: 50 }).fetch();

	// 		//group the achievements by a month-day date. * time of day is excluded on purpose
	// 		var groupedDates = _.groupBy(_.pluck(userAchievementsDataSet, 'progression'), function(date) {
	// 			return moment(date).format("MMM D"); // May 22
	// 		});

	// 		//push the correct objects into the achievementData array to pass to d3
	// 		_.each(_.values(groupedDates), function(dates) {
	// 			achievementData.push({
	// 				date: dates[0],
	// 				total: dates.length
	// 			});
	// 		});

	// 		//console.log(achievementData);

	// 		var paths = svg.selectAll('path')
	// 		 			.data([achievementData]);

	// 		x.domain(d3.extent(achievementData, function(d) {
	// 			return d.date;
	// 		}));
			
	// 		//console.log("x domain: " + x.domain());

	// 		y.domain([0, d3.max(achievementData, function(d) {
	// 			return d.total + 1;
	// 		})]);

	// 		//console.log("y domain: " + y.domain());

	// 		//updates x axis
	// 		svg.select(".x.axis")
	// 					.transition()
	// 					.duration(500)
	// 					.call(xAxis);

	// 		//updates y axis
	// 		svg.select(".y.axis")
	// 					.transition()
	// 					.duration(500)
	// 					.call(yAxis);

	// 		d3.select('#achievements-chart g')
	// 		.append("svg:path")
	// 		.attr("class", "line")
	// 		.attr("id", "achievement-line")
	// 		.attr("d", line(achievementData))
	// 		.attr("stroke", "green")
	//      .attr("stroke-width", 3)
	//      .attr("fill", "none");
	// 	}
	// });
}

Template.achievementsChart.events({
 //		"click #achievement-chart-recent-activity-button": function(e) {
 //        console.log("fired");
 //        if(!$(e.target).hasClass('active')) {
 //            console.log("its going to 1 month");
 //            $(e.target).addClass('active');
 //            $('#achievement-chart-six-month-activity-button').removeClass('active');
 //            oneMonth = moment().subtract(1, 'month').toDate();
 //            timeRangeToggle.set(oneMonth);
 //        }
 //    },
 //    "click #achievement-chart-six-month-activity-button": function(e) {
 //        console.log("also fired");
 //        if(!$(e.target).hasClass('active')) {
 //            console.log("its going to 6 month");
 //            $(e.target).addClass('active');
 //            $('#achievement-chart-recent-activity-button').removeClass('active');
 //            sixMonths = moment().subtract(6, 'month').toDate();
 //            timeRangeToggle.set(sixMonths);
 //        }
 //    }
});

Tracker.autorun(function() {
});

var formatAchievementData = function(dataSet) {
	//var achievementDataArray = new Array();
	var achievementDataArray = [];
	var achievementDataString;
	var groupedDates = _.groupBy(_.pluck(dataSet, 'progression'), function(date) {
		//return moment(date).format('MMM D');
		return moment(date).format('MM/DD/YY');
	});

	//groupedDates.length;

	_.each(_.values(groupedDates), function(dates) {
		achievementDataArray.push({
			// date: d3.time.format('%m/%d/%Y')(new Date(dates[0])),
			date: moment(dates[0]).format('MM/DD/YY'),
			total: dates.length
		});
		//achievementDataString = JSON.stringify(achievementDataArray);
	});

	//console.log(achievementDataArray);

	return [
	{
		values: achievementDataArray,	//values - represents the array of {x,y} data points
		key: 'Achievements',			//key  - the name of the series.
		color: '#138013'				//color - optional: choose your own line color.
	}
	];
}

// function sinAndCos() {
// 	var sin = [],sin2 = [],
// 	cos = [];

// 	//Data is represented as an array of {x,y} pairs.
// 	for (var i = 0; i < 100; i++) {
// 		sin.push({x: i, y: Math.sin(i/10)});
// 		sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
// 		cos.push({x: i, y: .5 * Math.cos(i/10)});
// 	}

// 	console.log('sin:' + sin);

// 	//Line chart data should be sent as an array of series objects.
// 	return [
// 	{
// 		values: sin,      //values - represents the array of {x,y} data points
// 		key: 'Sine Wave', //key  - the name of the series.
// 		color: '#ff7f0e'  //color - optional: choose your own line color.
// 	},
// 	{
// 		values: cos,
// 		key: 'Cosine Wave',
// 		color: '#2ca02c'
// 	},
// 	{
// 		values: sin2,
// 		key: 'Another sine wave',
// 		color: '#7777ff',
// 	  area: true      //area - set to true if you want this line to turn into a filled area chart.
// 	}
// 	];
// }