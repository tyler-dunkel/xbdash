var winston = Npm.require('winston');

Npm.require('winston-papertrail').Papertrail;

logger = new (winston.Logger) ({
	transports: [
		new (winston.transports.Papertrail)({
			host: 'logs3.papertrailapp.com',
			port: 13713
		})
	]
});