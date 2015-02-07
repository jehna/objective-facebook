/// <reference path="baseobject.ts"/>
/// <reference path="userimage.ts"/>
/// <reference path="album.ts"/>
/// <reference path="post.ts"/>
/// <reference path="collection.ts"/>

module OOFB {
    export class User extends BaseObject {
        
        name : string;
        
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
        
        __setData(data : any) {
            for(var name in data) {
                this[name] = data[name];
            }
        }
        
        get albums() : AlbumCollection {
            // TODO: This is a stub
            return new AlbumCollection(this.graphURL + '/albums');
        }
        
        get feed() : Collection {
            return new PostCollection(this.graphURL + '/feed');
        }
        
        get posts() : PostCollection {
            return this.feed;
        }
        
        get home() : PostCollection {
            return new PostCollection(this.graphURL + '/home');
        }
        
        get wall() : PostCollection {
            return this.home;
        }
        
        get image() : UserImage {
            return this.picture;
        }
        
        get picture() : UserImage {
            return new UserImage(this.graphURL + '/picture');
        }
        
    }
}