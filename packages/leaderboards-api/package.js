Package.describe({
  name: 'xbdash:leaderboards-api',
  version: '0.0.48',
  // Brief, one-line summary of the package.
  summary: 'Class to rank users based on games, achievements, and gamerscore.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var where = ["client", "server"];

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use("momentjs:moment@2.10.6", where);
  api.addFiles('leaderboards-api.js', ['server']);
  api.export('leaderboardsApi', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('xbdash:leaderboards-api');
  api.addFiles('leaderboards-api-tests.js');
});
