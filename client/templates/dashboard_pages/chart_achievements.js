Template.achievementsChart.rendered = function() {
	var margin = {top: 0, right: 0, bottom: 15, left: 25},
		width = $(".chart-wrapper").width(),
		height = 300;

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
					var achievement = xbdAchievements.findOne({ _id: d.achievementId });
					console.log(achievement.value);
					return y(achievement.value);
				}).interpolate("basis");

	var svg = d3.select("#achievementsChart")
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
		.text("Achievements");

	this.autorun(function() {
		var userId = Meteor.userId();
		var userAchievementsDataSet = userAchievements.find({ userId: userId, progressState: true }, { sort: { progression: -1 }, limit: 50 }).fetch();
		//var dataset = Points.find({}, { sort: { date: -1 } }).fetch();

		var paths = svg.selectAll('path')
		 			.data([userAchievementsDataSet]);

		x.domain(d3.extent(userAchievementsDataSet, function(d) {
			return d.progression;
		}));
		
		console.log("x domain: " + x.domain());

		y.domain([0, d3.max(userAchievementsDataSet, function(d) { 
			var achievement = xbdAchievements.findOne({ _id: d.achievementId });
			return achievement.value;
		})]);

		console.log("y domain: " + y.domain());

		//updates x axis
		svg.select(".x.axis")
					.transition()
					.duration(500)
					.call(xAxis);

		//updates y axis
		svg.select(".y.axis")
					.transition()
					.duration(500)
					.call(yAxis);

		paths
					.enter()
					.append("svg:path")
					.attr("class", "line")
					.attr('d', line)
					.attr("stroke", "green")
                    .attr("stroke-width", 3)
                    .attr("fill", "none");

		paths
					.exit()
					.remove();
	});

	function resize() {
		/* Find the new window dimensions */
		var margin = {top: 0, right: 0, bottom: 15, left: 25},
		width = parseInt(d3.select("#achievementsChart").style("width")) - margin.left,
		height = parseInt(d3.select("#achievementsChart").style("height")) - margin.bottom;

		x.range([0, width - margin.left]);
		y.range([height - margin.bottom, 0]);

		svg
			.attr("width", width + margin*2)
			.attr("height", height + margin*2)

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
		 	.data([userAchievementsDataSet])
			.attr("d", line);
	}
	d3.select(window).on('resize', resize);
}

Tracker.autorun(function() {
	resize();
});