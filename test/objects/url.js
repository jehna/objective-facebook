'use strict';

describe('Object: Url debug', function () {
    
    // instantiate service
    var API = new OOFB('816021041756653|sBUcW6Wy24ivI5fzOobCwixzaR4');
    
    it('should debug URL', function (done) {
        
        API.Debug.facebookURL("https://www.facebook.com/zuck").get(function(zuck) {
            expect(zuck.id).toBe("4");
            expect(zuck.first_name).toBe("Mark");
            done();
        });
        
    });

});
