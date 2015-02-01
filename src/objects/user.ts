/// <reference path="baseobject.ts"/>
/// <reference path="image.ts"/>

module OOFB {
    export class User extends BaseObject {
        
        constructor(user) {
            // User can be one of the following:
            // - User ID :      123456789
            // - Facebook URL : https://facebook.com/user.name
            // - Empty :        uses the current, logged in user
            
            super();
            
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
        
        get image() {
            return new OOFB.Image(this.graphURL + '/image');
        }
        
        get feed() {
            return new OOFB.Image(this.graphURL + '/image');
        }
    }
}