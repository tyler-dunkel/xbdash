//server
Meteor.startup(function() {
	Meteor._debug('started debug');
	jc = JobCollection('xbdJobCollection');
	xbdqueue = jc.processJobs(
		'checkGamertag', {
			concurrency: 1,
			payload: 1,
			pollInterval: 1000,
			perfetch: 1
		},
		function (job, callback) {
			Meteor._debug('started worker');
			job.done();
			callback();
		}
	);

	var job = new Job(
		jc,
		'checkGamertag', {
			message: 'checked it again'
		}
	);

	job.save();

	//jc.getJob();
});

process.env.MAIL_URL="smtp://xboxdashbugreporter%40gmail.com:theskyisblue@smtp.gmail.com:465/";
Meteor.methods({
	contactUsEmail: function(name, email, subject, text) {
		Email.send({
			from: "xboxdashbugreporter@gmail.com",
			to: "kguirao87@gmail.com",
			subject: subject,
			text: text
		});
	}
});