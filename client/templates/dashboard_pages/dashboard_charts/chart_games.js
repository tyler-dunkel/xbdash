function convertToArray(dict) {
	var results = [];
	_.each(dict, function(value, key) {
		var object = {categoryName: key, count: value};
		//object[key] = value
		results.push(object);
	});
	return results;
}

Template.gamesChart.created = function() {
	this.subscribe('dashboardGameGenreChart');
}

Template.gamesChart.rendered = function() {
	var margin = {top: 15, right: 0, bottom: 15, left: 0},
		width = $(".chart-wrapper").width(),
		//width = 350,
		height = 400,
		innerRadius = 50,
    	outerRadius = 150,
    	labelRadius = 175;
		//radius = Math.min(width, height) / 2;

	resizeGamesChart = function resizeGamesChart() {
		// Find the new window dimensions
		console.log("resize function has fired");
		var margin = {top: 15, right: 0, bottom: 15, left: 0},
			width = $(".chart-wrapper").width(),
			height = 400;

		var svg = d3.select("#games-chart")
    			.attr("width", width)
    			.attr("height", height);

		var svgCanvas = svg.select("g.canvas")
    		.attr("transform", "translate(" + (width / 2) + "," + ( height / 2 ) + ")")
    		.transition()
			.duration(500);
	}

    var svg = d3.select("#games-chart")
    			.attr("width", width)
    			.attr("height", height);

    var svgCanvas = svg.append("g")
    		.attr("class", "canvas")
    		.attr("transform", "translate(" + (width / 2) + "," + ( height / 2 ) + ")");

    	svgCanvas.append("g")
    		.attr("class", "arc");
    	svgCanvas.append("g")
    		.attr("class", "labels");

	var pie = d3.layout.pie()
    			.sort(null)
    			.value(function(d) { return d.count; });

    var arc = d3.svg.arc()
    			.innerRadius(0)
    			.outerRadius(150);
    			//.outerRadius(radius - 10)
    			//.innerRadius(0);

	var color = d3.scale.category20();

	var arcSelect = d3.select(".arc");

	var labelsSelect = d3.select(".labels");

	d3.select(window).on('resize', resizeGamesChart);

	this.autorun(function() {
		var userId = Meteor.userId();
		var userGamesDataSet = userGames.find({ userId: userId }, { fields: { gameId: 1 }});
		var genreName = '';
		var result = {};
		var resultArray = [];

		userGamesDataSet.forEach(function (g) {
			var gameId = g.gameId;
			var getGameGenre = gameDetails.findOne({ gameId: gameId }, { fields: { gameGenre: 1 } });
			var gameGenre = getGameGenre.gameGenre;
			gameGenre.forEach(function (h) {
				// initialize count to 0 when a new key is found
				var genreName = h.Name;
				//console.log(genreName);
				if(_.isUndefined(result[genreName])){
					result[genreName] = 0;
				}
				// increment the corresponding count
				result[genreName]++;
			});
		});

		resultArray = convertToArray(result);

		var enteringArcs = arcSelect.selectAll(".slice").data(pie(resultArray)).enter();

		enteringArcs
			.append("path")
		    .attr("class", "slice")
		    .attr("d", arc)
		    .style("fill", function (d) {
		    	return color(d.data.categoryName);
			});

		var enteringLabels = labelsSelect.selectAll(".label").data(pie(resultArray)).enter();

		var labelGroups = enteringLabels.append("g").attr("class", "label");

		labelGroups
			.append("circle")
			.attr({
			    x: 0,
			    y: 0,
			    r: 2,
			    transform: function (d, i) {
			        centroid = arc.centroid(d);
			        return "translate(" + arc.centroid(d) + ")";
			    },
			        'class': "label-circle"
			});

		var textLines = labelGroups.append("line").attr({
		    x1: function (d, i) {
		        return arc.centroid(d)[0];
		    },
		    y1: function (d, i) {
		        return arc.centroid(d)[1];
		    },
		    x2: function (d, i) {
		        centroid = arc.centroid(d);
		        midAngle = Math.atan2(centroid[1], centroid[0]);
		        x = Math.cos(midAngle) * labelRadius;
		        return x;
		    },
		    y2: function (d, i) {
		        centroid = arc.centroid(d);
		        midAngle = Math.atan2(centroid[1], centroid[0]);
		        y = Math.sin(midAngle) * labelRadius;
		        return y;
		    },
		        'class': "label-line"
		});

		var textLabels = labelGroups.append("text").attr({
		    x: function (d, i) {
		        centroid = arc.centroid(d);
		        midAngle = Math.atan2(centroid[1], centroid[0]);
		        x = Math.cos(midAngle) * labelRadius;
		        sign = (x > 0) ? 1 : -1
		        labelX = x + (5 * sign)
		        return labelX;
		    },
		    y: function (d, i) {
		        centroid = arc.centroid(d);
		        midAngle = Math.atan2(centroid[1], centroid[0]);
		        y = Math.sin(midAngle) * labelRadius;
		        return y;
		    },
		        'text-anchor': function (d, i) {
		        centroid = arc.centroid(d);
		        midAngle = Math.atan2(centroid[1], centroid[0]);
		        x = Math.cos(midAngle) * labelRadius;
		        return (x > 0) ? "start" : "end";
		    },
		        'class': 'label-text'
		}).text(function (d) {
		    return d.data.categoryName;
		});

		var alpha = 0.5;
		var spacing = 12;

		function relax() {
		    var again = false;
		    textLabels.each(function (d, i) {
		        var a = this;
		        var da = d3.select(a);
		        var y1 = da.attr("y");
		        textLabels.each(function (d, j) {
		            var b = this;
		            // a & b are the same element and don't collide.
		            if (a == b) return;
		            var db = d3.select(b);
		            // a & b are on opposite sides of the chart and
		            // don't collide
		            if (da.attr("text-anchor") != db.attr("text-anchor")) return;
		            // Now let's calculate the distance between
		            // these elements. 
		            var y2 = db.attr("y");
		            var deltaY = y1 - y2;
		            
		            // Our spacing is greater than our specified spacing,
		            // so they don't collide.
		            if (Math.abs(deltaY) > spacing) return;
		            
		            // If the labels collide, we'll push each 
		            // of the two labels up and down a little bit.
		            again = true;
		            var sign = deltaY > 0 ? 1 : -1;
		            var adjust = sign * alpha;
		            da.attr("y", + y1 + adjust);
		            db.attr("y", + y2 - adjust);
		        });
		    });
		    
		    if (again) {
		        var labelElements = textLabels[0];
		        textLines.attr("y2",function(d,i) {
		            var labelForLine = d3.select(labelElements[i]);
		            return labelForLine.attr("y");
		        });
		        setTimeout(relax,20)
		    }
		}

		relax();
	});
}

Tracker.autorun(function() {
});