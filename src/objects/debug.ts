/// <reference path="baseobject.ts"/>

module OOFB {
    class AccessToken extends BaseObject {
        constructor() {
            super('/debug_token');
        }
        
        __fetch(setterCallback : (data : any) => void) {
            
            super.__fetch(function(data) {
                setterCallback.apply(this, arguments);
            }, {
                input_token: access_token,
                //access_token: access_token // Disabled for now, should not need this
            });
            return this;
        }
        
        __setData(data : any) {
            for (var name in data.data){
                this[name] = data.data[name];
            }
        }
    }
    
    class FacebookURL extends BaseObject {
        constructor(url : string) {
            // Oh my. Using Graph API 1.0 is very bad.
            this.apiVersion = "";
            var username : string = /^(?:https?:\/\/)(?:www\.)?facebook.com\/([\w]+)$/.exec(url)[1];
            super('/' + username);
        }
        
        __fetch(setterCallback : (data: any) => void, data? : any) : BaseObject {
            super.__fetch(function(data) {
                setterCallback.call(this, data);
            });
            return this;
        }
        
        __setData(data : any) {
            for(var name in data) {
                this[name] = data[name];
            }
        }
    }
    
    export class Debug {
        
        static get access_token() {
            return new AccessToken();
        }
        
        static facebookURL(url : string) {
            // Oh my.. This is wrong in so very many levels
            return new FacebookURL(url);
        }
        
    }
}