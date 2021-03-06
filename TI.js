'use strict';

//The library is compliant with requirejs
//http://stackoverflow.com/questions/17524364/make-my-javascript-function-requirejs-amd-friendly
//http://stackoverflow.com/questions/15613577/correct-way-to-implement-jquery-with-require-js/15649611

(function(module) {
    if (typeof define === "function" && define.amd) {
        define("tiapi", ['jquery'], function($) {
            return module.define_TILibrary();
        });
    } else {
        window.TI = module.define_TILibrary();
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
        
        TILibrary.setToken = function(token) {
            TILibrary.token = token;
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

        TILibrary.callWS = function(service, params, callback, errorCallback) {
            var url = TILibrary.backend;
            url += service

            if (params) {
                url += "?" + Object.keys(params).map(function(k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
                }).join('&')
            }

            $.ajax({
                type: "GET",
                url: url,
                headers: {
                    "Authorization": "Token " + TILibrary.token
                }
            })
            .done(callback)
            .fail(function(error) {
                if (errorCallback){
                  errorCallback(error)
                }
            });
        }

        return TILibrary;
    }
}));
