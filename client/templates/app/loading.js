
var message = "Please wait while we retrieve your data!";
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';

Template.loading.rendered = function() {
	if (! Session.get('loadingScreen')) {
		this.loading = window.pleaseWait({
			logo: '/img/logo.png',
			backgroundColor: '#00FF00',
			loadingHtml: message + spinner
		});
		Session.set('loadingScreen', true);
	}
}

Template.loading.destroyed = function() {
	if (this.loading) {
		this.loading.finish();
	}
}