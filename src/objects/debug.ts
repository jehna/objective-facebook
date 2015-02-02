/// <reference path="baseobject.ts"/>

module OOFB {
    class AccessToken extends BaseObject {
        constructor() {
            super('/debug_token');
        }
        
        __fetch(setterCallback : (data : any) => void) {
            
            super.__fetch(function(data) {
                for (var name in data.data){
                    this[name] = data.data[name];
                }
                setterCallback.apply(this, arguments);
            }, {
                input_token: access_token,
                access_token: access_token
            });
            return this;
        }
    }
    
    export class Debug {
        
        static get access_token() {
            return new AccessToken();
        }
        
        
        
    }
}