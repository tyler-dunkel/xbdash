Template.myGamesFiltering.created = function() {
	var routeParams = Router.current().params.query;
	this.sortParams = {};
}

Template.myGamesFiltering.rendered = function() {
	var self = this;
	$('.selectpicker').selectpicker();
	$('.selectpicker').on('changed.bs.select', function(e, currIdx) {
		var sortParams = self.sortParams;
		console.log(e.currentTarget);
		if ($(e.currentTarget).data('mod') === 'achievement-selector') {
			switch(currIdx) {
				case 0: 
					if (sortParams.earnedgamerscore) {
						delete sortParams.earnedgamerscore;
					}
					sortParams.earnedachievements = 'desc';
					Router.go('myGames', {}, { query: sortParams });
					break;
				case 1:
					if (sortParams.earnedgamerscore) {
						delete sortParams.earnedgamerscore;
					}
					sortParams.earnedachievements = 'asc';
					Router.go('myGames', {}, { query: sortParams });
					break;
				case 2:
					sortParams.earnedgamerscore = 'desc';
					Router.go('myGames', {}, { query: sortParams });
					break;
				default:
					sortParams.earnedgamerscore = 'asc';
					Router.go('myGames', {}, { query: sortParams });
			}
		} else {
			switch(currIdx) {
				case 0: 
					sortParams.completed = 'all';
					Router.go('myGames', {}, { query: sortParams });
					break;
				case 1:
					sortParams.completed = 'true';
					Router.go('myGames', {}, { query: sortParams });
					break;
				default: 
					sortParams.completed = 'false';
					Router.go('myGames', {}, { query: sortParams });
			}
		}
		Session.set('forceReset', 0);
	});
}

Template.myGamesFiltering.events({
	"click .a-to-z": function(e) {
		var sortParams = Template.instance().sortParams;
		sortParams.name = 'desc';
		Router.go('myGames', {}, { query: sortParams });
		$(e.currentTarget).addClass('active');
		$('.z-to-a').removeClass('active');
		Session.set('forceReset', 0);
	},
	"click .z-to-a": function(e) {
		var sortParams = Template.instance().sortParams;
		sortParams.name = 'asc';
		Router.go('myGames', {}, { query: sortParams });
		$(e.currentTarget).addClass('active');
		$('.a-to-z').removeClass('active');
		Session.set('forceReset', 0);
	}
});

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
		if (sortParams.name) {
			delete sortParams.name;
		}
		sortParams.releaseDate = (currIdx === 1) ? 'asc' : 'desc';
		console.log(sortParams);
		Router.go('gamesPage', {}, { query: sortParams });
		Session.set('forceReset', 0);
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
		Session.set('forceReset', 0);
	},
	"click .a-to-z": function(e) {
		var sortParams = Template.instance().sortParams;
		sortParams.name = 'desc';
		Router.go('gamesPage', {}, { query: sortParams });
		$(e.currentTarget).addClass('active');
		$('.z-to-a').removeClass('active');
		Session.set('forceReset', 0);
	},
	"click .z-to-a": function(e) {
		var sortParams = Template.instance().sortParams;
		sortParams.name = 'asc';
		Router.go('gamesPage', {}, { query: sortParams });
		$(e.currentTarget).addClass('active');
		$('.a-to-z').removeClass('active');
		Session.set('forceReset', 0);
	}
});