/// <reference path="baseobject.ts"/>

module OOFB {
    export class Image extends BaseObject {
        
        url : string;
        
        constructor(graphURL : string) {
            super();
            this.graphURL = graphURL;
        }
        
        __fetch(callback : (data : any) => void) {
            var self = this;
            super.__fetch(function(data : any) {
                // TODO: Make this work like it's done in the FB API
                console.log(self);
                self.url = 'http://placekitten.com/300/200';
                callback(data);
            });
            return this;
        }
        
    }
}