(function(window) {

    'use strict';

    function define_TILibrary() {
        var TILibrary = {};

        TILibrary.token = ""

        TILibrary.login = function(email, pass, callback) {
            $.ajax({
                type: "POST",
                url: "https://api.travel-intelligence.com/api/v1/session",
                data: {
                    "session": {
                        "email": email,
                        "password": pass
                    }
                }
            }).done(function(msg) {
                var token = msg.session.auth_token
		TILibrary.token = token
                callback(msg)
            })
        }

        //Logout
        TILibrary.logout = function(callback) {
	    
            //Logged out
            $.ajax({
                type: "DELETE",
                url: "https://api.travel-intelligence.com/api/v1/session",
                headers: {
                    "Authorization": "Token " + TILibrary.token
                }
            }).done(function(msg) {
                callback()
            });
        }

        TILibrary.callWS = function(service, params, callback) {
            var url = "https://api.travel-intelligence.com/";
            url += service + "?"
            url += Object.keys(params).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
            }).join('&')

            $.ajax({
                type: "GET",
                url: url,
                headers: {
                    "Authorization": "Token " + TILibrary.token
                }
            }).done(function(msg) {
                callback(msg)
            });
        }

        return TILibrary;
    }

    //define globally if it doesn't already exist
    if (typeof(TI) === 'undefined') {
        window.TI = define_TILibrary();
    } else {
        console.log("TI already defined.");
    }

})(window);
