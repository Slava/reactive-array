Package.describe({
  name: 'slava:reactive-array',
  summary: 'Tracker-aware array implementation',
  version: '1.0.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('reactive-array.js');
  api.export('ReactiveArray');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('slava:reactive-array');
  api.addFiles('reactive-array-tests.js');
});

