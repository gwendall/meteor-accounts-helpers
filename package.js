Package.describe({
  name: 'gwendall:accounts-helpers',
  summary: 'Useful helpers for Accounts',
  version: '0.1.3',
  git: 'https://github.com/gwendall/meteor-accounts-helpers'
});

var packages = [
  'accounts-base',
  'accounts-ui',
  'underscore',
  'templating',
  'service-configuration',
  'gwendall:body-events',
  'aldeed:simple-schema'
];

Package.on_use(function(api, where) {

  api.use(packages);
  api.imply(packages);

  api.add_files([
    'client/hooks.js',
    'client/helpers.js'
  ], 'client');

  api.add_files([
    'server/lib.js'
  ], 'server');

});
