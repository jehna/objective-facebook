function OOFB(appid) {
    var OOFB = this;
    this.appid = appid;
    
    
var OOFB;
(function (OOFB) {
    var BaseObject = (function () {
        function BaseObject() {
            this.graphURL = '';
            this.fetched = false;
        }
        BaseObject.prototype.success = function (callback) {
            if (this.fetched) {
                callback(this);
            }
            else {
                // Call this thingie when fetch is complete
                var self = this;
                this.__fetch(function (data) {
                    callback(self);
                });
            }
            return this;
        };
        BaseObject.prototype.fail = function (callback) {
            // Call when failed
            return this;
        };
        BaseObject.prototype.finally = function (callback) {
            if (this.fetched) {
                callback();
            }
            else {
            }
            return this;
        };
        BaseObject.prototype.__fetch = function (setterCallback) {
            // Construct an FB API object to fetch data for this motherficker
            setterCallback(null);
            return this;
        };
        return BaseObject;
    })();
    OOFB.BaseObject = BaseObject;
})(OOFB || (OOFB = {}));
/// <reference path="baseobject.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var OOFB;
(function (OOFB) {
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(graphURL) {
            _super.call(this);
            this.graphURL = graphURL;
        }
        Image.prototype.__fetch = function (callback) {
            var self = this;
            _super.prototype.__fetch.call(this, function (data) {
                // TODO: Make this work like it's done in the FB API
                console.log(self);
                self.url = 'http://placekitten.com/300/200';
                callback(data);
            });
            return this;
        };
        return Image;
    })(OOFB.BaseObject);
    OOFB.Image = Image;
})(OOFB || (OOFB = {}));
/// <reference path="baseobject.ts"/>
/// <reference path="image.ts"/>
var OOFB;
(function (OOFB) {
    var User = (function (_super) {
        __extends(User, _super);
        function User(user) {
            // User can be one of the following:
            // - User ID :      123456789
            // - Facebook URL : https://facebook.com/user.name
            // - Empty :        uses the current, logged in user
            _super.call(this);
            var fbuser_url_regexp = /^https?:\/\/(?:www\.)?facebook.com\/([\w]+)$/;
            if (typeof user === 'number') {
                this.graphURL = '/' + user.toString();
            }
            else if (fbuser_url_regexp.test(user) === true) {
                var username = fbuser_url_regexp.exec(user);
            }
            else if (typeof user === 'undefined') {
                this.graphURL = '/me';
            }
        }
        Object.defineProperty(User.prototype, "image", {
            get: function () {
                return new OOFB.Image(this.graphURL + '/image');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(User.prototype, "feed", {
            get: function () {
                return new OOFB.Image(this.graphURL + '/image');
            },
            enumerable: true,
            configurable: true
        });
        return User;
    })(OOFB.BaseObject);
    OOFB.User = User;
})(OOFB || (OOFB = {}));
var OOFB;
(function (OOFB) {
    function login(callback) {
        //API.appid = Math.random().toString();
        var login = new OOFB.BaseObject();
        login.success(function (p) {
            callback(OOFB);
        });
        return login;
    }
    OOFB.login = login;
    function logout(callback) {
        //API.appid = Math.random().toString();
        var logout = new OOFB.BaseObject();
        logout.success(function (p) {
            callback(OOFB);
        });
        return logout;
    }
    OOFB.logout = logout;
})(OOFB || (OOFB = {}));
/// <reference path="oofbapi.ts"/>
/// <reference path="baseobject.ts"/>
/// <reference path="image.ts"/>
/// <reference path="user.ts"/>
/// <reference path="login.ts"/>
/// <reference path="objects/oofb.ts"/>
//# sourceMappingURL=app.js.map

}