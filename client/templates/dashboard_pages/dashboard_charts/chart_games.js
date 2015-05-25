function convertToArray(dict) {
	var results = [];
	_.each(dict, function(value, key) {
		var object = {};
		object[key] = value;
		results.push(object);
	});
	return results;
}

Template.gamesChart.rendered = function() {
	var margin = {top: 0, right: 0, bottom: 15, left: 25},
		width = $(".chart-wrapper").width(),
		height = 300,
		radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
    			.range(["#138013", "#0E6060", "#A05618", "#A01818", "#4AB34A", "#378686", "#C47432", "#DF5C5C"]);

    var arc = d3.svg.arc()
    			.outerRadius(radius - 10)
    			.innerRadius(0);

    var pie = d3.layout.pie()
    			.sort(null)
    			.value(function(d) { return d.population; });

    var svg = d3.select("body").append("svg")
    			.attr("width", width)
    			.attr("height", height)
    			.append("g")
    			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	this.autorun(function() {
		var userId = Meteor.userId();
		var userGamesDataSet = userGames.find({ userId: userId }, { fields: { gameId: 1 }}).fetch();
		//console.log(userGamesDataSet);
		var result = {};
		var resultArray = [];
		var genreName = '';

		userGamesDataSet.forEach(function (g) {
			var gameId = g.gameId;
			var getGameGenre = gameDetails.find({ gameId: gameId }, {fields: { gameGenre: 1 }}).fetch();
			getGameGenre.forEach(function (h) {
				var gameGenre = h.gameGenre;
				gameGenre.forEach(function (i) {
					// initialize count to 0 when a new key is found
					var genreName = i.Name;
					if(_.isUndefined(result[genreName])){
						result[genreName] = 0;
					}
					// increment the corresponding count
					result[genreName]++;
				});
			});
		});

		resultArray = convertToArray(result);

		console.log(resultArray);

		var paths = svg.selectAll(".arc")
					.data(pie(resultArray))
					.enter().append("g")
					.attr("class", "arc");

		paths
			.append("path")
			.attr("d", arc)
			.style("fill", function(resultArray) {
				d3.map([{
					genreName: d.0,
					genreCount: d.1
				}]);
				return color(d.genreName);
			});

		paths
			.append("text")
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.text(function(d) { return d.genreName; });
	});
}

Tracker.autorun(function() {
});