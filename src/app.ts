/// <reference path="objects/oofb.ts"/>

var API = OOFB.API("put_api_key_here");

var user = new API.User(12345);
user.image.success(function(image) {
    console.log(image);
});

var FB = OOFB.API('API_KEY_HERE');
FB.login(function(FB) {
    var me = new FB.User();
    console.log("Logged in:", me);
    FB.logout(function(FB) {
        console.log("Logged out");
    });
});