/// <reference path="baseobject.ts"/>
/// <reference path="collection.ts"/>

module OOFB {
    export class Album extends BaseObject {
    }
    
    export class AlbumCollection extends Collection {
        
        __fetch(setterCallback : (data: any) => void) {
            super.__fetch(function(data) {
                console.log(data);
            });
            return this;
        }
    }
}