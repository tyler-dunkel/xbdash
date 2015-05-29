function convertToArray(dict) {
	var results = [];
	_.each(dict, function(value, key) {
		var object = {categoryName: key, count: value};
		//object[key] = value
		results.push(object);
	});
	return results;
}

Template.gamesChart.rendered = function() {
	var margin = {top: 0, right: 0, bottom: 15, left: 25},
		width = $(".chart-wrapper").width(),
		height = 300,
		radius = Math.min(width, height) / 2;

    var svg = d3.select("#gamesChart")
    			.attr("width", width)
    			.attr("height", height)
    			.append("g")
    			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	    svg.append("g")
			.attr("class", "slices");
		svg.append("g")
			.attr("class", "labels");
		svg.append("g")
			.attr("class", "lines");

	var pie = d3.layout.pie()
    			.sort(null)
    			.value(function(d) { return d.count; });

    var arc = d3.svg.arc()
    			.outerRadius(radius - 10)
    			.innerRadius(0);

    var outerArc = d3.svg.arc()
					.innerRadius(radius * 0.9)
					.outerRadius(radius * 0.9);

	var color = d3.scale.category20();

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

		var slice = svg.select(".slices")
					.selectAll("path")
					.data(pie(resultArray), function(d) { return d.data.categoryName; });

		slice.enter()
			.append("path")
			.attr("class", "slice")
			.attr("d", arc)
			.attr("fill", function(d) {
				return color(d.data.categoryName);
			});

		slice.transition()
			.duration(1000)
			.attrTween("d", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) { return arc(interpolate(t)); };
			});

		slice.exit().remove();

		var text = svg.select(".labels")
					.selectAll("text")
					.data(pie(resultArray), function(d) { return d.data.categoryName; });

		text.enter()
			.append("text")
			.attr("dy", ".35em")
			.text(function(d) { return d.data.categoryName; });

		function midAngle(d){
			return d.startAngle + (d.endAngle - d.startAngle)/2;
		}

		text.transition()
			.duration(1000)
			.attrTween("transform", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
					return "translate("+ pos +")";
				};
			})
			.styleTween("text-anchor", function(d){
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					return midAngle(d2) < Math.PI ? "start":"end";
				};
			});

		text.exit().remove();

		var polyline = svg.select(".lines")
						.selectAll("polyline")
						.data(pie(resultArray), function(d) { return d.data.categoryName; });
		
		polyline.enter()
			.append("polyline");

		polyline.transition()
			.duration(1000)
			.attrTween("points", function(d){
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
					return [arc.centroid(d2), outerArc.centroid(d2), pos];
				};			
			});

		polyline.exit().remove();
	});
}

Tracker.autorun(function() {
});