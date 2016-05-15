Template.recentGamesFiltering.created = function() {
	var routeParams = Router.current().params.query;
	this.sortParams = {};
	if (routeParams.genres) {
		this.sortParams.genres = routeParams.genres.join(",");
	}
}

Template.recentGamesFiltering.rendered = function() {
	var self = this;
	$('.selectpicker').selectpicker();

	$('.selectpicker').on('changed.bs.select', function(e, currIdx) {
		var sortParams = self.sortParams;
		sortParams.releaseDate = (currIdx === 1) ? 'asc' : 'dsc';
		console.log(sortParams);
		Router.go('gamesPage', {}, {query: sortParams });
	});
}

Template.recentGamesFiltering.events({
	"click .game-genre-button": function(e) {
		var target = $(e.currentTarget);
		var routeParams = Router.current().params.query;
		var sortParams = Template.instance().sortParams;
		if (routeParams.genres) {
			var index = routeParams.genres.indexOf(target.data('val'));
			if (index === -1) {
				routeParams.genres.push(target.data('val'));
				sortParams.genres = routeParams.genres.join(",");
			} else {
				routeParams.genres.splice(index, 1);
				sortParams.genres = routeParams.genres.join(",");
			}
		} else {
			console.log(target.data('val'));
			sortParams.genres = target.data('val');
		}
		console.log(sortParams);
		Router.go('gamesPage', {}, { query: sortParams });
	},
	"click .a-to-z": function(e) {
		var sortParams = Template.instance().sortParams;
		sortParams.name = 'desc';
		Router.go('gamesPage', {}, {query: sortParams});
	},
	"click .z-to-a": function(e) {
		var sortParams = Template.instance().sortParams;
		sortParams.name = 'asc';
		Router.go('gamesPage', {}, {query: sortParams});
	}
});

Template.myGamesFiltering.rendered = function() {
	$('.selectpicker').selectpicker();
}