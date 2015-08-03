
// var message = "<h3>Please wait while we retrieve your data!</h3>";
// var spinner = "<div class='spinner'>" +
// 				"<div class='double-bounce1'></div> " + 
//  				"<div class='double-bounce2'></div> " +
// 				"</div>";

// Template.loading.rendered = function() {
// 	if (! Session.get('loadingScreen')) {
// 		this.loading = window.pleaseWait({
// 			logo: 'img/xbdash_whiteicon.png',
// 			backgroundColor: '#138013',
// 			loadingHtml: message + spinner
// 		});
// 		Session.set('loadingScreen', true);
// 	}
// }

// Template.loading.destroyed = function() {
// 	if (this.loading) {
// 		this.loading.finish();
// 	}
// }