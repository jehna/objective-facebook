module OOFB {
    export var appid : number;
    export function API(appid : number) {
        OOFB.appid = appid;
        return OOFB;
    }
}