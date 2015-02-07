module OOFB {
    export module Graph {
        export enum Method {
            GET,
            POST,
            PUT,
            DELETE
        }
        
        var instance_namespace = "__ns__" + ((Math.random()*100000)|0).toString(16);
        global.OOFB.__globalCallbacks = global.OOFB.__globalCallbacks || {};
        global.OOFB.__globalCallbacks[instance_namespace] = {};
        
        function serialize(obj) {
            var str = [];
            for(var p in obj){
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");
        }
        
        var uniq : number = 0;
        
        export function api(endpoint : string, method : Method, params, successCallback, errorCallback, version? : string) {
            
            var cbname = "__graph__" + (uniq++).toString();
            version = typeof version === "string" ? version : "v2.2";
            
            params = params || {};
            params['callback'] = _global + ".OOFB.__globalCallbacks." + instance_namespace + "." + cbname;
            params['method'] = method;
            params['access_token'] = access_token;
            params['date_format'] = 'c';
            
            var url : string = "https://graph.facebook.com/" + version + endpoint + "?" + serialize(params);
            
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            
            var callee = this;
            global.OOFB.__globalCallbacks[instance_namespace][cbname] = function(data) {
                if (data.error) {
                    // TODO: Proper error messages
                    errorCallback.call(callee, data.error);
                    return;
                }
                successCallback.apply(callee, arguments);
                global.OOFB.__globalCallbacks[instance_namespace][cbname] = null;
                document.getElementsByTagName('head')[0].removeChild(script);
            }
            
            document.getElementsByTagName('head')[0].appendChild(script);
            
            
        }
    }
}