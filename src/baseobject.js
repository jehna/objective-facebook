function FBBaseObject() {
    this.baseURL = "";
    this.fetched = false;
}

FBBaseObject.prototype.success = function(callback) {
    if (this.fetched) {
        callback();
    } else {
        // Call this thingie when fetch is complete
    }
    
    return this;
}
FBBaseObject.prototype.fail = function(callback) {
    // Call when failed
    return this;
}
FBBaseObject.prototype.finally = function(callback) {
    if (this.fetched) {
        callback();
    } else {
        // Call this thingie when fetch is done/undone
    }
    return this;
}
FBBaseObject.prototype.__fetch = function(setterCallback) {
    // Construct an FB API object to fetch data for this motherficker
    return this;
}


function FBImage(baseURL) {
    this.baseURL = baseURL;
}
FBImage.prototype = new FBBaseObject();
FBImage.prototype.__fetch = function() {
    var self = this;
    this.__proto__.__fetch(function(data) {
        // TODO: Make this work like it's done in the FB API
        self.url = data.url;
    });
    return this;
}


function FBUser(user) {
    // User can be one of the following:
    // - User ID :      123456789
    // - Facebook URL : https://facebook.com/user.name
    // - Empty :        uses the current, logged in user
    
    var fbuser_url_regexp = /^https?:\/\/(?:www\.)?facebook.com\/([\w]+)$/;
    if (typeof user === 'number') {
        this.baseURL = '/'+user.toString();
        
    } else if (fbuser_url_regexp.test(user) === true) {
        var username = fbuser_url_regexp.exec(user);
        // TODO: Resolve UserID from the username
        
    } else if (typeof user === 'undefined') {
        this.baseURL = '/me';
        
    }
}

FBUser.prototype = new FBBaseObject();
FBUser.prototype.__defineGetter__("image", function() {
    return new FBImage(this.baseURL + "/image");
});
FBUser.prototype.__defineGetter__("feed", function() {
    return new FBImage(this.baseURL + "/image");
});









// Test code to draft how the new API should work
var jesse = new FBUser(100000475343767);
jesse.image.success(function(image) {
    new Image(image.url);
});

