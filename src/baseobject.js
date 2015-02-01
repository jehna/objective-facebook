function OOFB(API_KEY) {
    var FB = this;
    
    FB.BaseObject = function() {
        this.graphURL = '';
        this.fetched = false;
    }
    
    FB.BaseObject.prototype.success = function(callback) {
        if (this.fetched) {
            callback();
        } else {
            // Call this thingie when fetch is complete
        }
        
        return this;
    }
    FB.BaseObject.prototype.fail = function(callback) {
        // Call when failed
        return this;
    }
    FB.BaseObject.prototype.finally = function(callback) {
        if (this.fetched) {
            callback();
        } else {
            // Call this thingie when fetch is done/undone
        }
        return this;
    }
    FB.BaseObject.prototype.__fetch = function(setterCallback) {
        // Construct an FB API object to fetch data for this motherficker
        return this;
    }
    
    FB.Image = function(graphURL) {
        this.graphURL = graphURL;
    }
    FB.Image.prototype = new FB.BaseObject();
    FB.Image.prototype.__fetch = function() {
        var self = this;
        this.__proto__.__fetch(function(data) {
            // TODO: Make this work like it's done in the FB API
            self.url = data.url;
        });
        return this;
    }
    
    
    FB.User = function(user) {
        // User can be one of the following:
        // - User ID :      123456789
        // - Facebook URL : https://facebook.com/user.name
        // - Empty :        uses the current, logged in user
        
        var fbuser_url_regexp = /^https?:\/\/(?:www\.)?facebook.com\/([\w]+)$/;
        if (typeof user === 'number') {
            this.graphURL = '/'+user.toString();
            
        } else if (fbuser_url_regexp.test(user) === true) {
            var username = fbuser_url_regexp.exec(user);
            // TODO: Resolve UserID from the username
            
        } else if (typeof user === 'undefined') {
            this.graphURL = '/me';
            
        }
    }
    
    FB.User.prototype = new FB.BaseObject();
    FB.User.prototype.__defineGetter__('image', function() {
        return new FB.Image(this.graphURL + '/image');
    });
    FB.User.prototype.__defineGetter__('feed', function() {
        return new FB.Image(this.graphURL + '/image');
    });
    
    
    FB.login = function(callback) {
        var login = new FB.BaseObject();
        login.success(callback);
        callback(FB); // For debuggin'
        return login;
    }
    FB.logout = function(callback) {
        var logout = new FB.BaseObject();
        logout.success(callback);
        callback(FB); // For debuggin'
        return logout;
    }
}






var FB = new OOFB('API_KEY_HERE');

// Test code to draft how the new API should work
var jesse = new FB.User(100000475343767);
jesse.image.success(function(image) {
    new Image(image.url);
});


var FB = new OOFB('API_KEY_HERE');
FB.login(function(FB) {
    var me = new FB.User();
    console.log("Logged in:", me);
    FB.logout(function(FB) {
        console.log("Logged out");
    });
});