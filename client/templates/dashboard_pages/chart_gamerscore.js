var timeRangeToggle = new ReactiveVar();
Template.gamerscoreChart.rendered = function() {
	var margin = {top: 0, right: 0, bottom: 15, left: 25},
		width = $(".chart-wrapper").width(),
		height = 300;

	var oneMonth = moment().subtract(1, 'month').toDate();
    timeRangeToggle.set(oneMonth);

	resize = function resize() {
		/* Find the new window dimensions */
		//console.log("resize function has fired");
		var margin = {top: 0, right: 0, bottom: 15, left: 25},
		width = parseInt(d3.select(".chart-wrapper").style("width")) - margin.left,
		//height = parseInt(d3.select(".chart-wrapper").style("height")) - margin.bottom;
		height = 300;

		x.range([0, width - margin.left - margin.right]);
		y.range([height - margin.bottom, 0]);

		svg
			.attr("width", width)
			.attr("height", height);

		svg
			.select(".x.axis")
			.transition()
			.duration(500)
			.call(xAxis);

		svg
			.select(".y.axis")
			.transition()
			.duration(500)
			.call(yAxis);

		svg.selectAll('path')
			.attr("d", line);
	}

	dataToggleChange = function() {

	}

	// defines x as time scale
	var x = d3.time.scale()
			.range([0, width - margin.left - margin.right]);

	var y = d3.scale.linear()
			.range([height - margin.bottom, 0]);

	// defines axes
	var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.ticks(7);

	var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(7);

	// defines tick values
	var line = d3.svg.line()
				.x(function(d) {
					return x(d.progression);
				})
				.y(function(d) {
					var gamerscore = xbdAchievements.findOne({ _id: d.achievementId });
					console.log(gamerscore.value);
					return y(gamerscore.value);
				}).interpolate("basis");

	var svg = d3.select("#gamerscoreChart")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + 279 + ")");

	svg.append("g")
		.attr("class", "y axis")
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Gamerscore");

	d3.select(window).on('resize.one', resize);

	//d3.select('.chart-wrapper').on('resize.two', resize);

	this.autorun(function() {
		var userId = Meteor.userId();
		var timeToggle = timeRangeToggle.get();
		console.log(timeToggle);
		var userGamerscoreDataSet = userAchievements.find({ userId: userId, progressState: true, progression: {$gte: timeToggle} }, 
			{ sort: { progression: -1 }, limit: 50 }).fetch();

		console.log(userGamerscoreDataSet);
		//var dataset = Points.find({}, { sort: { date: -1 } }).fetch();

		var paths = svg.selectAll('path')
		 			.data([userGamerscoreDataSet]);

		x.domain(d3.extent(userGamerscoreDataSet, function(d) {
			return d.progression;
		}));
		
		console.log("x domain: " + x.domain());

		y.domain([0, d3.max(userGamerscoreDataSet, function(d) { 
			var gamerscore = xbdAchievements.findOne({ _id: d.achievementId });
			return gamerscore.value;
		})]);

		console.log("y domain: " + y.domain());

		//svg.selectAll(".x.axis").remove();

		//updates x axis
		svg.select(".x.axis")
					.transition()
					.duration(500)
					.call(xAxis);
		console.log("got here");

// 		if (svg.selectAll(".y.axis")[0].length < 1 ){
// 			svg.append("g")
// 			.attr("class","y axis")
// 			.call(yAxis)
// // otherwise, update the axis else {
// 			svg.selectAll(".y.axis").transition().duration(500).call(yAxis)
// 		}

		//updates y axis
		svg.select(".y.axis")
					.transition()
					.duration(500)
					.call(yAxis);

		console.log("got here too");


		// paths
		// 			.transition().duration(1500)
		// 			.attr('d', line)
		// 			.attr("stroke", "green")
		// 			.attr("stroke-width", 3)
  //                   .attr("fill", "none");

		paths
					.enter()
					.append("svg:path")
					.attr("class", "line")
					.attr('d', line)
					.attr("stroke", "green")
                    .attr("stroke-width", 3)
                    .attr("fill", "none");

        paths
					.transition().duration(1500)
					.attr('d', line)
					.attr("stroke", "green")
					.attr("stroke-width", 3)
                    .attr("fill", "none");

		paths
					.exit()
					.remove();
	});

}

Template.gamerscoreChart.events({
	"click #recent-activity-button": function(e) {
        console.log("fired");
        if(!$(e.target).hasClass('active')) {
            console.log("its going to 1 month");
            $(e.target).addClass('active');
            $('#six-month-activity-button').removeClass('active');
            oneMonth = moment().subtract(1, 'month').toDate();
            timeRangeToggle.set(oneMonth);
        }
    },
    "click #six-month-activity-button": function(e) {
        console.log("also fired");
        if(!$(e.target).hasClass('active')) {
            console.log("its going to 6 month");
            $(e.target).addClass('active');
            $('#recent-activity-button').removeClass('active');
            sixMonths = moment().subtract(6, 'month').toDate();
            timeRangeToggle.set(sixMonths);
        }
    }
});


Tracker.autorun(function() {
});