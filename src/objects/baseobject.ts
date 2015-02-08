/// <reference path="grapherror.ts"/>
module OOFB {
    export class BaseObject {
        
        graphURL : string;
        fetched : boolean;
        apiVersion : string;
        __errorCallbacks = [];
        
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
        
        error(callback : (error : GraphError) => void) : BaseObject {
            this.__errorCallbacks.push(callback);
            return this;
        }
        
        __fetch(setterCallback : (data: any) => void, data? : any) : BaseObject {
            // Construct an FB API object to fetch data for this motherficker
            OOFB.Graph.api.call(this, this.graphURL, OOFB.Graph.Method.GET, data, function() {
                this.fetched = true;
                this.__setData.apply(this, arguments);
                setterCallback.apply(this, arguments);
            }, function(error) {
                for(var i in this.__errorCallbacks) {
                    this.__errorCallbacks[i].call(this, error);
                }
            }, this.apiVersion);
            
            return this;
        }
        
        __setData(data : any) {
            
        }
    
    }
}