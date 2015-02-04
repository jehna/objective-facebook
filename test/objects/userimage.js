'use strict';

describe('Object: UserImage', function () {

    // load the service's module
    //beforeEach(module('huntapinApp'));
    
    // instantiate service
    var API = new OOFB('816021041756653|sBUcW6Wy24ivI5fzOobCwixzaR4');
    
    it('should fetch user image', function (done) {
        var user = new API.User(100000475343767);
        
        user.image.success(function(image) {
            expect(image.width).toBe(320);
            expect(image.height).toBe(320);
            
            var imgNode = document.createElement("img");
            imgNode.src = image.url;
            imgNode.onload = function() {
                expect(imgNode.naturalWidth).toBe(320);
                expect(imgNode.naturalHeight).toBe(320);
                done();
            }
            document.body.appendChild(imgNode);
            
        });
    });

});
