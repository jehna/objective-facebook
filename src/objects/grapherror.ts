module OOFB {
    export class GraphError {
        
        message : string;
        code : number;
        
        constructor(error : any) {
            this.message = this.messageWithCode(error.code)
            this.code = error.code;
        }
        
        messageWithCode(code : number) {
            switch(code) {
                case 102:
                    return 'You need to log in';
                default:
                    return 'Unknown error';
            }
        }
    }
}