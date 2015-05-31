var timeRangeToggle = new ReactiveVar();

Template.achievementsChart.rendered = function() {
	var margin = {top: 0, right: 0, bottom: 15, left: 25},
		width = $(".chart-wrapper").width(),
		height = 300;

	var oneMonth = moment().subtract(1, 'month').toDate();
    timeRangeToggle.set(oneMonth);

	//collect the data and arrange it for the first time on render
	var userId = Meteor.userId();
	var achievementData = new Array();
	var userAchievementsDataSet = userAchievements.find({ userId: userId, progressState: true, progression: {$gt: oneMonth} }, 
															{ sort: { progression: -1 }, limit: 50 }).fetch();
	var groupedDates = _.groupBy(_.pluck(userAchievementsDataSet, 'progression'), function(date) {
				return moment(date).format("MMM D"); // May 22
			});

			//push the correct objects into the achievementData array to pass to d3
	_.each(_.values(groupedDates), function(dates) {
		achievementData.push({
			date: dates[0],
			total: dates.length
		});
	});

	resizeAchievementChart = function resizeAchievementChart() {
		//Find the new window dimensions
		var margin = {top: 0, right: 0, bottom: 15, left: 25},
			width = $(".chart-wrapper").width(),
			height = 300;

		var achievementData = new Array();
		var timeToggle = timeRangeToggle.get();
		var userAchievementsDataSet = userAchievements.find({ userId: userId, progressState: true, progression: {$gt: timeToggle} }, 
																{ sort: { progression: -1 }, limit: 50 }).fetch();
		var groupedDates = _.groupBy(_.pluck(userAchievementsDataSet, 'progression'), function(date) {
					return moment(date).format("MMM D"); // May 22
				});

				//push the correct objects into the achievementData array to pass to d3
		_.each(_.values(groupedDates), function(dates) {
			achievementData.push({
				date: dates[0],
				total: dates.length
			});
		});

		x.range([0, width - margin.left - margin.right]);
		y.range([height - margin.bottom, 0]);

		d3.select("#achievements-chart")
			.attr("width", width)
			.attr("height", height);

		svg
			.select(".x.axis")
			.transition()
			.call(xAxis);

		svg
			.select(".y.axis")
			.transition()
			.call(yAxis);

		svg
			.selectAll('path')
			.attr("d", line(achievementData));
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
					return x(d.date);
				})
				.y(function(d) {
					return y(d.total);
				}).interpolate("cardinal");

	//create the chart for the first time
	var svg = d3.select("#achievements-chart")
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

	var paths = svg.selectAll('path')
			 			.data([achievementData]);

	x.domain(d3.extent(achievementData, function(d) {
				return d.date;
			}));

	y.domain([0, d3.max(achievementData, function(d) {
		return d.total + 1;
	})]);

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
				.attr("id", "achievement-line")
                .attr("stroke-width", 3)
                .attr("fill", "none");

	paths
				.exit()
				.remove();

	d3.select(window).on('resize.achievements', resizeAchievementChart);

	//d3.select('.chart-wrapper').on('resize.two', resize);

	this.autorun(function(comp) {
		var userId = Meteor.userId();
		var achievementData = new Array();
		var timeToggle = timeRangeToggle.get();

		if (!comp.firstRun) {
			d3.select('#achievement-line').remove();
			var userAchievementsDataSet = userAchievements.find({ userId: userId, progressState: true, progression: {$gte: timeToggle} }, 
																	{ sort: { progression: -1 }, limit: 50 }).fetch();

			//group the achievements by a month-day date. * time of day is excluded on purpose
			var groupedDates = _.groupBy(_.pluck(userAchievementsDataSet, 'progression'), function(date) {
				return moment(date).format("MMM D"); // May 22
			});

			//push the correct objects into the achievementData array to pass to d3
			_.each(_.values(groupedDates), function(dates) {
				achievementData.push({
					date: dates[0],
					total: dates.length
				});
			});

			//console.log(achievementData);

			var paths = svg.selectAll('path')
			 			.data([achievementData]);

			x.domain(d3.extent(achievementData, function(d) {
				return d.date;
			}));
			
			//console.log("x domain: " + x.domain());

			y.domain([0, d3.max(achievementData, function(d) {
				return d.total + 1;
			})]);

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

			d3.select('#achievements-chart g')
			.append("svg:path")
			.attr("class", "line")
			.attr("id", "achievement-line")
			.attr("d", line(achievementData))
			.attr("stroke", "green")
            .attr("stroke-width", 3)
            .attr("fill", "none");
		}
	});

}

Template.achievementsChart.events({
	"click #achievement-chart-recent-activity-button": function(e) {
        console.log("fired");
        if(!$(e.target).hasClass('active')) {
            console.log("its going to 1 month");
            $(e.target).addClass('active');
            $('#achievement-chart-six-month-activity-button').removeClass('active');
            oneMonth = moment().subtract(1, 'month').toDate();
            timeRangeToggle.set(oneMonth);
        }
    },
    "click #achievement-chart-six-month-activity-button": function(e) {
        console.log("also fired");
        if(!$(e.target).hasClass('active')) {
            console.log("its going to 6 month");
            $(e.target).addClass('active');
            $('#achievement-chart-recent-activity-button').removeClass('active');
            sixMonths = moment().subtract(6, 'month').toDate();
            timeRangeToggle.set(sixMonths);
        }
    }
});

Tracker.autorun(function() {
});