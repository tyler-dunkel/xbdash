Package.describe({
  name: 'xbdash:xbd-logger',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'winston': '2.1.1',
  'winston-papertrail': '1.0.2'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('xbd-logger.js', ['server']);
  api.export('logger', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('xbdash:xbd-logger');
  api.addFiles('xbd-logger-tests.js');
});
