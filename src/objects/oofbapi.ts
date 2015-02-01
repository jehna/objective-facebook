module OOFB {
    export var _api_key : string;
    export function API(api_key : string) {
        OOFB._api_key = api_key;
        return OOFB;
    }
}