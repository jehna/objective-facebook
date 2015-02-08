/// <reference path="baseobject.ts"/>
/// <reference path="collection.ts"/>

module OOFB {
    export class Image extends BaseObject {
        
        url : string;
        width : number;
        height : number;
        
        constructor(graphURL : string, width? : number, height? : number) {
            super();
            this.graphURL = graphURL;
            
            if (width || height) {
                this.width = width;
                this.height = height;
            } else {
                this.width = 320;
                this.height = 320;
            }
            
        }
        
        __fetch(setterCallback : (data : any) => void) {
            var params = {
                redirect: false
            }
            if (this.width) params['width'] = this.width;
            if (this.height) params['height'] = this.height;
            
            super.__fetch(function(data) {
                setterCallback.apply(this, arguments);
            }, params);
            return this;
        }
        __setData(data : any) {
            this.url = data.data.url;
        }
    }
    
    export class ImageCollection extends Collection {
        
        __setData(data : any) {
            console.log("moooi", data);
            /*
            for(var i in data.data) {
                var imageData = data.data[i];
                var image = new Image();
                image.fetched = true;
                image.__setData(postData);
                this['push'](post);
            }
            */
        }
        
    }
}