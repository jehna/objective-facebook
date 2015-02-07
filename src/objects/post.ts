/// <reference path="baseobject.ts"/>
/// <reference path="collection.ts"/>
/// <reference path="user.ts"/>

module OOFB {
    export class Post extends BaseObject {
        id : string;
        // actions : object[]
        // application : App
        caption : string;
        created_time : Date;
        description : string;
        // feed_targeting : object
        from : User;
        icon : string;
        is_hidden : boolean;
        link : string;
        message : string;
        // message_tags : object
        name : string;
        picture : string;
        // place : Page;
        // privacy : object;
        // properties : object[];
        shares : number; // Said to be an object
        source : string;
        // status_type : enumthingie;
        story : string;
        // story_tags: object
        //to: User[]
        // type: enum thingie
        updated_time : Date;
        //with_tags : User[];
        
        __setData(data : any) {
            this.id = data.id;
            this.caption = data.caption;
            this.created_time = new Date(data.created_time);
            this.description = data.description;
            this.from = new User(parseInt(data.from.id));
            this.from.name = data.from.name;
            this.icon = data.icon;
            this.is_hidden = !!data.is_hidden;
            this.link = data.link;
            this.message = data.message;
            this.name = data.name;
            this.picture = data.picture;
            if(typeof data.shares !== "undefined") this.shares = parseInt(data.shares);
            this.source = data.source;
            this.story = data.story;
            this.updated_time = new Date(data.updated_time);
        }
    }
    
    export class PostCollection extends Collection {
        
        __setData(data : any) {
            for(var i in data.data) {
                var postData = data.data[i];
                var post = new Post();
                post.fetched = true;
                post.__setData(postData);
                this['push'](post);
            }
        }
    }
}