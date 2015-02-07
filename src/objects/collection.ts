/// <reference path="baseobject.ts"/>

module OOFB {
    export class Collection extends BaseObject {
        
        constructor(url : string) {
            super(url);
            var injectMethods = Object.getOwnPropertyNames(Array.prototype);
            for (var name in injectMethods){
                var method = injectMethods[name];
                // Add the method to the collection.
                this[ method ] = Array.prototype[ method ];
            }
        }
    }
}

