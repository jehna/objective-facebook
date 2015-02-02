module OOFB {
    export function login(callback : (oofb : any) => void) {
        OOFB.api_key = Math.random().toString();
        
        var login = new OOFB.BaseObject();
        login.success(function(p) {
            callback(OOFB);
        });
        return login;
    }
    export function logout(callback : (oofb : any) => void) {
        OOFB.api_key = Math.random().toString();
        
        var logout = new OOFB.BaseObject();
        logout.success(function(p) {
            callback(OOFB);
        });
        return logout;
    }
}