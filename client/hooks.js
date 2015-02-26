/////////////////
// LOGIN HOOKS //
/////////////////

Accounts._hooksLogin = Accounts._hooksLogin || [];

Accounts.onLogin = function(cb) {
  if (!_.isFunction(cb)) return;
  Accounts._hooksLogin.push(cb);
}

Accounts._callHooksLogin = function() {
  var self = this;
  Accounts._hooksLogin.forEach(function(cb) {
    cb.apply(self);
  });
}

//////////////////
// LOGOUT HOOKS //
//////////////////

Accounts._hooksLogout = Accounts._hooksLogout || [];

Accounts.onLogout = function(cb) {
  if (!_.isFunction(cb)) return;
  Accounts._hooksLogout.push(cb);
}

Accounts._callHooksLogout = function() {
  var self = this;
  Accounts._hooksLogout.forEach(function(cb) {
    cb.apply(self);
  });
}

/////////////////////
// CONNECTED HOOKS //
/////////////////////

Accounts._hooksConnect = Accounts._hooksConnect || [];

Accounts.onConnect = function(cb) {
  if (!_.isFunction(cb)) return;
  Accounts._hooksConnect.push(cb);
}

Accounts._callHooksConnect = function(provider) {
  var self = this;
  Accounts._hooksConnect.forEach(function(cb) {
    cb.apply(self, [provider]);
  });
}

////////////////////////
// DISCONNECTED HOOKS //
////////////////////////

Accounts._hooksDisconnect = Accounts._hooksDisconnect || [];

Accounts.onDisconnect = function(cb) {
  if (!_.isFunction(cb)) return;
  Accounts._hooksDisconnect.push(cb);
}

Accounts._callHooksDisconnect = function(provider) {
  var self = this;
  Accounts._hooksDisconnect.forEach(function(cb) {
    cb.apply(self, [provider]);
  });
}

/////////////////////
// EVENTS TRACKING //
/////////////////////

// #TODO find out how to know when the logged-in user is loaded on page load
Meteor.setTimeout(function() {

  var _user = Meteor.user() || {};
  Meteor.autorun(function() {

    var user = Meteor.user() || {};
    (function(_user, user) {

      if (user === _user) return;

      var loggedIn = ((_.keys(user).length) && (!_.keys(_user).length));
      if (loggedIn) return Accounts._callHooksLogin.apply(this, []);

      var loggedOut = ((!_.keys(user).length) && (_.keys(_user).length));
      if (loggedOut) return Accounts._callHooksLogout();

      var _services = _.keys(_user.services || {});
      var services = _.keys(user.services || {});
      if (services.length === _services.length) return;

      var added = _.difference(services, _services);
      if (added.length === 1) return Accounts._callHooksConnect(added[0]);

      var removed = _.difference(_services, services);
      if (removed.length === 1) return Accounts._callHooksDisconnect(removed[0]);

    })(_user, user);
    _user = user;

  });

}, 3000);
