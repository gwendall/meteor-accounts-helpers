/////////////////
// LOGIN HOOKS //
/////////////////

Accounts._hooksLogin = Accounts._hooksLogin || [];

Accounts.onLogin = function(cb) {
  if (!_.isFunction(cb)) return;
  Accounts._hooksLogin.push(cb);
};

Accounts._callHooksLogin = function() {
  var self = this;
  Accounts._hooksLogin.forEach(function(cb) {
    cb.apply(self);
  });
};

//////////////////
// LOGOUT HOOKS //
//////////////////

Accounts._hooksLogout = Accounts._hooksLogout || [];

Accounts.onLogout = function(cb) {
  if (!_.isFunction(cb)) return;
  Accounts._hooksLogout.push(cb);
};

Accounts._callHooksLogout = function() {
  var self = this;
  Accounts._hooksLogout.forEach(function(cb) {
    cb.apply(self);
  });
};

/////////////////////
// CONNECTED HOOKS //
/////////////////////

Accounts._hooksConnect = Accounts._hooksConnect || [];

Accounts.onConnect = function(cb) {
  if (!_.isFunction(cb)) return;
  Accounts._hooksConnect.push(cb);
};

Accounts._callHooksConnect = function(provider) {
  var self = this;
  Accounts._hooksConnect.forEach(function(cb) {
    cb.apply(self, [provider]);
  });
};

////////////////////////
// DISCONNECTED HOOKS //
////////////////////////

Accounts._hooksDisconnect = Accounts._hooksDisconnect || [];

Accounts.onDisconnect = function(cb) {
  if (!_.isFunction(cb)) return;
  Accounts._hooksDisconnect.push(cb);
};

Accounts._callHooksDisconnect = function(provider) {
  var self = this;
  Accounts._hooksDisconnect.forEach(function(cb) {
    cb.apply(self, [provider]);
  });
};

///////////////////////
// DISCONNECT METHOD //
///////////////////////

Accounts.disconnect = function(provider, cb) {
  Meteor.call('accounts.disconnect', provider, cb);
};

/////////////////////
// EVENTS TRACKING //
/////////////////////

Meteor.startup(function() {

  var user_before = Meteor.user() || {};
  if (user_before._id) {
    Accounts._callHooksLogin.apply(this, []);
  }

  Meteor.autorun(function() {

    var user_after = Meteor.user() || {};
    (function(user_before, user_after) {

      if (user_after === user_before) return;

      var loggedIn = ((_.keys(user_after).length) && (!_.keys(user_before).length));
      if (loggedIn) return Accounts._callHooksLogin.apply(this, []);

      var loggedOut = ((!_.keys(user_after).length) && (_.keys(user_before).length));
      if (loggedOut) return Accounts._callHooksLogout();

      var services_before = _.keys(user_before.services || {});
      var services_after = _.keys(user_after.services || {});
      if (services_after.length === services_before.length) return;

      var added = _.difference(services_after, services_before);
      if (added.length === 1) return Accounts._callHooksConnect(added[0]);

      var removed = _.difference(services_before, services_after);
      if (removed.length === 1) return Accounts._callHooksDisconnect(removed[0]);

    })(user_before, user_after);
    user_before = user_after;

  });

});
