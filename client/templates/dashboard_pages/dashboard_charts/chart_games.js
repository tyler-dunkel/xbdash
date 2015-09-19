var gameChart;

Template.gamesChart.created = function() {
	this.subscribe('dashboardGameGenreChart');
}

Template.gamesChartSvg.rendered = function() {
	var userId = Meteor.userId();
	var userGamesDataSet = userGames.find({ userId: userId }, { fields: { gameId: 1 }});
	var genreName = '';
	var result = {};
	var formattedGameData = [];

	userGamesDataSet.forEach(function (game) {
		var gameId = game.gameId;
		var getGameGenre = gameDetails.findOne({ gameId: gameId }, { fields: { gameGenre: 1 } });
		var gameGenre = getGameGenre.gameGenre;
		
		gameGenre.forEach(function (genre) {
			var genreName = genre.Name;
			if(_.isUndefined(result[genreName])){
				result[genreName] = 0;
			}
			result[genreName]++;
		});
	});

	formattedGameData = formatGameData(result);

	nv.addGraph(function() {
		gameChart = nv.models.pieChart()
			.x(function(d) { return d.genre })
			.y(function(d) { return d.count })
			.color(d3.scale.category20().range())
			.donut(true)
			.donutRatio(0.35)
			.showLabels(false)
			.donutLabelsOutside(false)
			.labelThreshold(.01)
			.labelType("key")
			.cornerRadius(5);

		updateGamesChart(formattedGameData);

		return gameChart;
  	});

  	this.autorun(function (c) {
		var timeRange = timeRangeToggle.get();
		console.log("gamerscore chart ran for time range");
		if (!c.firstRun) {
			var userId = Meteor.userId();
			var userGamesDataSet = userGames.find({ userId: userId }, { fields: { gameId: 1 }});
			var genreName = '';
			var result = {};
			var formattedGameData = [];

			userGamesDataSet.forEach(function (game) {
				var gameId = game.gameId;
				var getGameGenre = gameDetails.findOne({ gameId: gameId }, { fields: { gameGenre: 1 } });
				var gameGenre = getGameGenre.gameGenre;
				
				gameGenre.forEach(function (genre) {
					var genreName = genre.Name;
					if(_.isUndefined(result[genreName])){
						result[genreName] = 0;
					}
					result[genreName]++;
				});
			});

			formattedGameData = formatGameData(result);
			
			updateGamesChart(formattedGameData);
		}
	});
}

Tracker.autorun(function() {
});

var updateGamesChart = function(formattedData) {
	d3.select("#games-chart svg").datum(formattedData).transition().duration(350).call(gameChart);
	d3.select("g.nv-label *").style("width", "110px");
	nv.utils.windowResize(gameChart.update);
}

var formatGameData = function(dataSet) {
	var gameDataArray = [];

	_.each(dataSet, function(value, key) {
		gameDataArray.push({
			genre: key,
			count: value
		});
	});

	return gameDataArray;
}