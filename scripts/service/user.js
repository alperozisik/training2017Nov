const Http = require("sf-core/net/http");
const http = new Http();

exports.login = function(username, password) {
    username = username.toLowerCase();
    return new Promise(function(resolve, reject) {
        http.request({
            'url': 'https://training-alperozisik.c9users.io/login',
            'headers': {
                "Content-type": "application/json"
            },
            'method': 'POST',
            'body': JSON.stringify({
                username: username,
                password: password
            }),
            onLoad: function(response) {
                response.body = response.body.toString();
                if (response.statusCode === 200)
                    resolve("success");
                else {
                    reject(response.body);
                }
            },
            onError: function(e) {
                // Handle error like:
                if (e.statusCode === 500) {
                    reject("Internal Server Error Occurred.");
                }
                else if (e.statusCode === 401) {
                    reject("invalid Logon");
                }
                else {
                    reject("Server responsed with: " + e.statusCode + ". Message is: " + e.message);
                }
            }
        });
    });


};
