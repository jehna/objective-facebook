module OOFB {
    export function login(callback : (oofb : any) => void) {
        //API.appid = Math.random().toString();
        
        var login = new OOFB.BaseObject();
        login.get(function(p) {
            callback(OOFB);
        });
        return login;
    }
    export function logout(callback : (oofb : any) => void) {
        //API.appid = Math.random().toString();
        
        var logout = new OOFB.BaseObject();
        logout.get(function(p) {
            callback(OOFB);
        });
        return logout;
    }
}