Template.achievementsFiltering.created = function() {
}

Template.achievementsFiltering.events({
	"click .achievement-filtering-button": function(e) {
	}
});

Template.achievementsFiltering.rendered = function() {
	$('.selectpicker').selectpicker();
}

Template.myAchievementsFiltering.created = function() {
	var routeParams = Router.current().params.query;
	this.sortParams = {};
	if (routeParams.genres) {
		this.sortParams.genres = routeParams.genres.join(",");
		console.log(this.sortParams.genres);
	}
}

Template.myAchievementsFiltering.events({
	"click .achievement-filtering-button": function(e) {
	}
});

Template.myAchievementsFiltering.rendered = function() {
	$('.selectpicker').selectpicker();
}