Package.describe({
  name: 'limonte:sweetalert2',
  version: "0.4.5",
  // Brief, one-line summary of the package.
  summary: 'SweetAlert2 A beautiful replacement for JavaScript\'s "alert"',
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
    'sweetalert2.css',
    'sweetalert2.js'
  ], ['client']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('limonte:sweetalert2');
  api.addFiles('sweetalert2-tests.js');
});