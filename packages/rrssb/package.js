Package.describe({
  name: 'kni-labs:rrssb',
  version: "1.5.0",
  // Brief, one-line summary of the package.
  summary: 'Really responsive social media buttons.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles([
    'rrssb.css',
    'rrssb.min.js'
  ], ['client']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kni-labs:rrssb');
  api.addFiles('rrssb-tests.js');
});