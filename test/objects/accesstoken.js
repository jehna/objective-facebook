'use strict';

describe('Object: AccessToken', function () {
    
    // instantiate service
    var API = new OOFB('816021041756653|sBUcW6Wy24ivI5fzOobCwixzaR4');
    
    it('should validate access token', function (done) {
        
        API.Debug.access_token.success(function(access_token) {
            expect(access_token.is_valid).toBe(true);
            done();
            
        });
    });

});
