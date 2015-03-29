//server
Meteor.startup(function() {
	Meteor._debug('started debug');
	jc = JobCollection('xbdJobCollection');
	jc.startJobServer();
	//jc.setLogStream(process.stdout);
	var xbdqueue = jc.processJobs(
		'testJob', {
			pollInterval: 1000
		},
		function (job, callback) {
			Meteor._debug(job.data.message);
			job.done();
			callback();
		}
	);
	//xbdqueue.resume();
	//jc.startJobServer();

	var job = new Job(
		jc,
		'testJob', {
			message: 'checked it again'
		}
	);

	job.save({}, function(error, result) {
		if (error) Meteor._debug(error);
		else {
			//Meteor._debug(result);
			//var qll = xbdqueue.length();
			//Meteor._debug(qll);
		}
	});

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