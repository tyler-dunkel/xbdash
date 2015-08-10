var overlayShow = new ReactiveVar();

var overlay = {
	show: function() {
		overlayShow.set('show');
	},
	hide: function() {
		overlayShow.set('hide');
	}
}

Template.searchBar.rendered = function() {
}

Template.searchBar.events({
	"click .navbar-search .form-control": function (e) {
		console.log("clicked search bar");
		overlay.show();
	}
});

Tracker.autorun(function() {
});

Template.searchOverlayApp.rendered = function() {
	$(".search-input").focus();
}

Template.searchOverlayApp.helpers({
	searchIndexes: function() {
		return ['xbdgames', 'xbdachievements', 'newspolygon'];
	}
});

Template.searchOverlay.events({
	"click .overlay-close": function(e) {
		console.log("clicked close");
		overlay.hide();
	}
})

Template.searchOverlay.helpers({
	overlayVisible: function() {
		console.log("search overlay firing");
		if (overlayShow.get() === 'show') {
			return true;
		}
	}
});