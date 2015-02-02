module OOFB {
    export class BaseObject {
        
        graphURL : string;
        fetched : boolean;
        
        constructor() {
            this.graphURL = '';
            this.fetched = false;
        }
        
        success(callback : (self : BaseObject) => void) {
            if (this.fetched) {
                callback(this);
            } else {
                // Call this thingie when fetch is complete
                var self = this;
                this.__fetch(function(data : any) {
                    callback(this);
                });
            }
            
            return this;
        }
        
        fail(callback : (error : any) => void) {
            // Call when failed
            return this;
        }
        finally(callback) {
            if (this.fetched) {
                callback();
            } else {
                // Call this thingie when fetch is done/undone
            }
            return this;
        }
        __fetch(setterCallback : (data: any) => void) {
            // Construct an FB API object to fetch data for this motherficker
            OOFB.Graph.api.call(this, this.graphURL, OOFB.Graph.Method.GET, null, function() {
                setterCallback.apply(this, arguments);
            });
            
            return this;
        }
    
    }
}