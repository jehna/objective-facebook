function OOFB(access_token) {
    var OOFB = this;
    this.access_token = access_token;
    
    
global = window ? window : global;
var _global = window ? 'window' : 'global';
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
                    callback(this);
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
        BaseObject.prototype.__fetch = function (setterCallback, data) {
            // Construct an FB API object to fetch data for this motherficker
            OOFB.Graph.api.call(this, this.graphURL, 0 /* GET */, data, function () {
                setterCallback.apply(this, arguments);
            });
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
        function Image(graphURL, width, height) {
            _super.call(this);
            this.graphURL = graphURL;
            if (width || height) {
                this.width = width;
                this.height = height;
            }
            else {
                this.width = 320;
                this.height = 320;
            }
        }
        Image.prototype.__fetch = function (setterCallback) {
            var params = {
                redirect: false
            };
            if (this.width)
                params['width'] = this.width / 2;
            if (this.height)
                params['height'] = this.height / 2;
            _super.prototype.__fetch.call(this, function (data) {
                this.url = data.data.url;
                setterCallback.apply(this, arguments);
            }, params);
            return this;
        };
        return Image;
    })(OOFB.BaseObject);
    OOFB.Image = Image;
})(OOFB || (OOFB = {}));
/// <reference path="image.ts"/>
var OOFB;
(function (OOFB) {
    var UserImage = (function (_super) {
        __extends(UserImage, _super);
        function UserImage() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(UserImage.prototype, "original", {
            get: function () {
                return new OOFB.Image(this.graphURL + '/picture', 1000000);
            },
            enumerable: true,
            configurable: true
        });
        return UserImage;
    })(OOFB.Image);
    OOFB.UserImage = UserImage;
})(OOFB || (OOFB = {}));
/// <reference path="baseobject.ts"/>
/// <reference path="userimage.ts"/>
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
        User.prototype.__fetch = function (setterCallback) {
            // Construct an FB API object to fetch data for this motherficker
            _super.prototype.__fetch.call(this, function (data) {
                for (var name in data) {
                    this[name] = data[name];
                }
                setterCallback.apply(this, arguments);
            });
            return this;
        };
        Object.defineProperty(User.prototype, "image", {
            get: function () {
                return new OOFB.UserImage(this.graphURL + '/picture');
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
var OOFB;
(function (OOFB) {
    var Graph;
    (function (Graph) {
        (function (Method) {
            Method[Method["GET"] = 0] = "GET";
            Method[Method["POST"] = 1] = "POST";
            Method[Method["PUT"] = 2] = "PUT";
            Method[Method["DELETE"] = 3] = "DELETE";
        })(Graph.Method || (Graph.Method = {}));
        var Method = Graph.Method;
        global.OOFB.__globalCallbacks = {};
        function serialize(obj) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");
        }
        var uniq = 0;
        function api(endpoint, method, params, callback) {
            var cbname = "__graph__" + (uniq++).toString();
            params = params || {};
            params['callback'] = _global + ".OOFB.__globalCallbacks." + cbname;
            params['method'] = method;
            params['access_token'] = access_token;
            var url = "https://graph.facebook.com/v2.1" + endpoint + "?" + serialize(params);
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            var callee = this;
            global.OOFB.__globalCallbacks[cbname] = function () {
                callback.apply(callee, arguments);
                global.OOFB.__globalCallbacks[cbname] = null;
                document.getElementsByTagName('head')[0].removeChild(script);
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        Graph.api = api;
    })(Graph = OOFB.Graph || (OOFB.Graph = {}));
})(OOFB || (OOFB = {}));
/// <reference path="oofbapi.ts"/>
/// <reference path="baseobject.ts"/>
/// <reference path="image.ts"/>
/// <reference path="user.ts"/>
/// <reference path="login.ts"/>
/// <reference path="graph.ts"/>
/// <reference path="objects/oofb.ts"/>


}