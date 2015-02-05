'use strict';

describe('Object: User', function () {

    // load the service's module
    //beforeEach(module('huntapinApp'));
    
    // instantiate service
    var API = new OOFB('816021041756653|sBUcW6Wy24ivI5fzOobCwixzaR4');
    
    it('should fetch user information', function (done) {
        var user = new API.User(100000475343767);
        
        user.get(function(user) {
            expect(user.fetched).toBe(true);
            expect(user.id).toBe('100000475343767');
            done();
        });
    });

});
