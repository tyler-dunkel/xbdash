Template.achievementsChart.rendered = function() {
	var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = $(".chart-wrapper").width(),
		height = 240;

	var x = d3.time.scale()
			.range([0, width]);

			console.log(x);

	var y = d3.scale.linear()
			.range([height, 0]);

			console.log(y);

	var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

	var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");

	var line = d3.svg.line()
				.x(function(d) {
					console.log(d);
					return x(d.progression);
				})
				.y(function(d) {
					console.log(d);
					return x(d.value);
				});

	var svg = d3.select("#achievementsChart")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")");

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
		var userAchievementsDataSet = userAchievements.find({ userId: userId, progressState: true }, { sort: { progression: -1 }, limit: 7 }).fetch();
		//var dataset = Points.find({}, { sort: { date: -1 } }).fetch();

		var paths = svg.selectAll("path.line")
					.data([userAchievementsDataSet]);

		x.domain(d3.extent(userAchievementsDataSet, function(d) {
			return d.progression;
		}));
		
		//console.log("x domain: " + x.domain());

		y.domain(d3.max(userAchievementsDataSet.map(function(d) { 
			//console.log(d);
			var achievement = xbdAchievements.findOne({ _id: d.achievementId });
			return achievement.value;
		})));

		//console.log("y domain: " + y.domain());

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
					.append("path")
					.attr("class", "line")
					.attr('d', line(userAchievementsDataSet));

		paths
					.exit()
					.remove();
	});
}

Tracker.autorun(function() {
});