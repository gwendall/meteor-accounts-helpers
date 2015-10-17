This package provides helpful helpers to deal with users.

Installation
------------

``` sh
meteor add gwendall:accounts-helpers
```

## Client methods  

***Accounts.onLogin(cb)***  

Hook for user log in.  
```javascript
Accounts.onLogin(function() {
  console.log('You are logged in.');
});
```

***Accounts.onLogout(cb)***  

Hook for user log out.  
```javascript
Accounts.onLogout(function() {
  console.log('You are logged out.');
});
```

***Accounts.onConnect(cb(provider))***  

Hook for user connection to a social account when already logged in.
Requires [splendido:accounts-meld](https://github.com/splendido/meteor-accounts-meld/).  
```javascript
Accounts.onConnect(function(provider) {
  console.log('You have connected your ' + provider + ' account.');
});
```

***Accounts.onDisconnect(cb(provider))***  

Hook for user disconnection to a social account when already logged in.
Requires [splendido:accounts-meld](https://github.com/splendido/meteor-accounts-meld/).  
```javascript
Accounts.onDisconnect(function(provider) {
  console.log('You have disconnected your ' + provider + ' account.');
});
```

***Accounts.disconnect(provider, cb)***  

Disconnect a social account.  
Requires [splendido:accounts-meld](https://github.com/splendido/meteor-accounts-meld/).  
```javascript
Accounts.disconnect('facebook', function() {
  console.log('You have disconnected your Facebook account.');
});
```

## Client template helpers  

```html
  <button data-accounts-loginwith={{provider}}>Login with {{provider}}</button>
```
Logs in the user with a given provider.  

```html
  <button data-accounts-disconnect={{provider}}>Disconnect {{provider}}</button>
```
Removes the given provider's credentials from the user.
Requires [splendido:accounts-meld](https://github.com/splendido/meteor-accounts-meld/).  

```html
  <button data-accounts-logout>Log out</button>
```
Logs the user out.

## Server methods  

***Accounts.onJoin(cb(data))***  

On user joins for the first time. The hook does not get triggered when Accounts.createUser is called with no client / user intent.
```javascript
Accounts.onJoin(function(data) {
  console.log('A user has joined from ' + data.type);
});
```

***Accounts.disconnect(userId, provider)***  

Disconnect an account provider.
Requires [splendido:accounts-meld](https://github.com/splendido/meteor-accounts-meld/).  
```javascript
USER_ID = '...';
Accounts.disconnect(USER_ID, 'facebook');
```
