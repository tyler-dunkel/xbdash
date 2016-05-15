Template.recentGamesFiltering.created = function() {
	var routeParams = Router.current().params.query;
	this.sortParams = {};
	if (routeParams.genres) {
		this.sortParams.genres = routeParams.genres.join(",");
		console.log(this.sortParams.genres);
	}
}

Template.recentGamesFiltering.events({
	"click .game-genre-button": function(e) {
		var target = $(e.currentTarget);
		var routeParams = Router.current().params.query;
		var sortParams = Template.instance().sortParams;
		if (routeParams.genres) {
			console.log('there is genres');
			var index = routeParams.genres.indexOf(target.data('val'));
			if (index === -1) {
				console.log('the index not in array');
				routeParams.genres.push(target.data('val'));
				//console.log(routeParams.genres);
				sortParams.genres = routeParams.genres.join(",");
				console.log(sortParams.genres);
			} else {
				console.log('the index is in array');
				console.log(index);
				routeParams.genres.splice(index, 1);
				sortParams.genres = routeParams.genres.join(",");
			}
		} else {
			console.log('no genres');
			sortParams.genres = { genres: target.data('val') };
		}
		console.log(sortParams);
		Router.go('gamesPage', {}, { query: sortParams });
	}
});

Template.recentGamesFiltering.rendered = function() {
	$('.selectpicker').selectpicker();
}

Template.myGamesFiltering.rendered = function() {
	$('.selectpicker').selectpicker();
}