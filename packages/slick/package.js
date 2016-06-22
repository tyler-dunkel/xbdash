Package.describe({
  name: 'kenwheeler:slick',
  version: '1.6.0',
  // Brief, one-line summary of the package.
  summary: 'The last carousel you\'ll ever need.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript','jquery','mrt:jquery-migrate']);
  api.addFiles([
    'slick.css',
    'slick-theme.css',
    'slick.min.js'
  ], ['client']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kenwheeler:slick');
  api.addFiles('slick-tests.js');
});