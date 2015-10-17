var cap = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var getAccountsUiOptions = function(provider) {

  var options = {};
  for (var key in Accounts.ui._options) {
    var option = Accounts.ui._options[key];
    if (_.isObject(option) && option[provider]) options[key] = option[provider];
  }
  return options;

}

Template.body.events({
  'click [data-accounts-loginwith]': function(e, tpl) {
    var provider = $(e.currentTarget).attr('data-accounts-loginwith');
    var options = $(e.currentTarget).attr('data-options') || getAccountsUiOptions(provider);
    var callback = eval($(e.currentTarget).attr('data-callback'));
    var login = 'loginWith' + cap(provider);
    if (!Meteor[login]) {
      alert('Can\'t login with ' + cap(provider) + '. Forgot to include accounts-' + provider + '?');
      return;
    }
    // console.log('Logging service config.', ServiceConfiguration.configurations.find().fetch());
    if (!ServiceConfiguration.configurations.findOne({ service: provider })) {
      alert('No API keys for ' + cap(provider) + '.');
      return;
    }
    Meteor[login](options, callback);
  },
  'click [data-accounts-logout]': function(e, tpl) {
    Meteor.logout();
  },
  'click [data-accounts-disconnect]': function(e, tpl) {
    var provider = $(e.currentTarget).attr('data-accounts-disconnect');
    var callback = eval($(e.currentTarget).attr('data-callback'));
    Meteor.call('accounts.disconnect', provider, callback);
  },
});
