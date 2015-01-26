'use strict';

(function(module) {
    if (typeof define === "function" && define.amd) {
        define(function() {
            return module;
        });
    } else {
        window.myfunction = module.myfunction;
    }
}({
    define_TILibrary: function() {

        var TILibrary = {};

        TILibrary.version = "0.1"
        TILibrary.token = ""
        TILibrary.backend = "https://beta-api.travel-intelligence.com/"

        TILibrary.configure = function(backend) {
            TILibrary.backend = backend;
        }

        TILibrary.login = function(email, pass, callback) {
            $.ajax({
                type: "POST",
                url: TILibrary.backend + "api/v1/session",
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
                url: TILibrary.backend + "api/v1/session",
                headers: {
                    "Authorization": "Token " + TILibrary.token
                }
            }).done(function(msg) {
                callback()
            });
        }

        TILibrary.callWS = function(service, params, callback) {
            var url = TILibrary.backend;
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
}));
