Package.describe({
  name: "gwendall:accounts-helpers",
  summary: "Helpers for Accounts",
  version: "0.1.0"
});

Package.on_use(function (api, where) {

  api.use([
    "accounts-base",
    "accounts-ui",
    "underscore",
    "templating",
    "gwendall:body-events",
  ]);

  api.add_files(["client/hooks.js", "client/helpers.js"], "client");
  api.add_files(["server/lib.js"], "server");

});
