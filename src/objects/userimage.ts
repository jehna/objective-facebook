/// <reference path="image.ts"/>

module OOFB {
    export class UserImage extends Image {
        
        get original() {
            return new OOFB.Image(this.graphURL + '/picture', 1000000);
        }
        
    }
}