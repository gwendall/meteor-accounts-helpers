This package provides helpful hooks to deal with users.

Installation
------------

``` sh
meteor add gwendall:accounts-helpers
```

## Client methods  
***Accounts.onLogin(cb)***
***Accounts.onLogout(cb)***
***Accounts.onConnect(cb(provider))***
***Accounts.onDisconnect(cb(provider))***
***Accounts.disconnect(provider, cb)***

## Server methods  
***Accounts.onJoin(cb({ user: ..., provider: ... }))***

***Accounts.disconnect(userId, provider)***
