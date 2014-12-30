## Overview

   TI.js follows the noBackend philosophy and allows you to use in an easier way the Travel Intelligence Web Services.

## API

Use configure to change the backend (it uses beta-api as the default backend):

```javascript
TI.configure("https://api.travel-intelligence.com/")
```

Use login to log into the Travel Intelligence Platform:

```javascript
TI.login($("#email").val(), $("#pass").val(), function(token) {
    alert("Logged in")
 })
```

Use logout to log out:

```javascript
TI.logout(function() {
    alert("logged out")
})
```

Use callWS to call the service:

```javascript
TI.callWS("api/v1/airline_searches",{q:"iberia",limit:3},function(msg) {
    alert(JSON.stringify(msg));
 });
```

## TODO

* Get list of services
* Unit Tests
