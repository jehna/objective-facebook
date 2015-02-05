module OOFB {
    export class BaseObject {
        
        graphURL : string;
        fetched : boolean;
        apiVersion : string;
        
        constructor(graphURL : string = '') {
            this.graphURL = graphURL;
            this.fetched = false;
        }
        
        get(callback : (self : BaseObject) => void) : BaseObject {
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
        
        __fetch(setterCallback : (data: any) => void, data? : any) : BaseObject {
            // Construct an FB API object to fetch data for this motherficker
            OOFB.Graph.api.call(this, this.graphURL, OOFB.Graph.Method.GET, data, function() {
                this.fetched = true;
                setterCallback.apply(this, arguments);
            }, this.apiVersion);
            
            return this;
        }
    
    }
}