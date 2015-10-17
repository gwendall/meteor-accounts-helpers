Meteor.methods({
  'accounts.disconnect': function(provider) {
    check(this.userId, String);
    check(provider, String);
    Accounts.disconnect(this.userId, provider);
  }
});

Accounts.onLogin(function(data) {
  var user = Meteor._get(data, 'user');
  if (user._loggedIn) return;
  var selector = { _id: user._id };
  var modifier = { $set: { _loggedIn: true }};
  Meteor.users.update(selector, modifier);
  data.user = Meteor.users.findOne(selector);
  Accounts._execOnJoinHooks(data);
});

Accounts.disconnect = function(userId, provider) {

  var selector = { _id: userId };
  var user = Meteor.users.findOne(selector);
  var providers = _.difference(_.keys(user.services), ['resume', provider]);
  if (!providers.length) throw new Meteor.Error(500, 'You need to keep at least one service connected to be able to login again.');
  delete user.services[provider];
  var modifier = { $set: { services: user.services }};
  Meteor.users.update(selector, modifier);
  return provider;

}

Accounts.onJoin = function(hook) {
  Accounts._onJoinHooks.push(hook);
}

Accounts._onJoinHooks = [];

Accounts._execOnJoinHooks = function(data) {
  _.each(Accounts._onJoinHooks, function(hook) {
    hook.apply(this, [data]);
  });
}

Meteor.startup(function() {
  if (!Meteor.users._c2) return;
  Meteor.users.attachSchema({
    _loggedIn: {
      type: Boolean,
      defaultValue: false,
      optional: true
    }
  });
});
