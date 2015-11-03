Package.describe({
  name: 'xbdash:xbox-api',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Used to update and scan users based on their gamertag',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use("meteorhacks:async@1.0.0", ['server']);
  api.addFiles('xbox-api-caller.js', ['server']);
  api.addFiles('xbox-api-private.js', ['server']);
  api.addFiles('xbox-api.js', ['server']);
  api.export('xboxApiObject', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('xbdash:xbox-api');
  api.addFiles('xbox-api-tests.js');
});
