Meteor.methods({
  "accounts.disconnect": function(provider) {
    check(provider, String);
    var selector = { _id: this.userId };
    var user = Meteor.users.findOne(selector);
    var providers = _.difference(_.keys(user.services), ["resume", provider]);
    if (!providers.length) throw new Meteor.Error(500, "You need to keep at least one service connected to be able to login again.");
    delete user.services[provider];
    var modifier = { $set: { services: user.services }};
    Meteor.users.update(selector, modifier);
    return provider;
  }
})
