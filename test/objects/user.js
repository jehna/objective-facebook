'use strict';

describe('Object: User', function () {

    // load the service's module
    //beforeEach(module('huntapinApp'));
    
    // instantiate service
    var API = new OOFB('816021041756653|sBUcW6Wy24ivI5fzOobCwixzaR4');
    var userID = 100000475343767;
    var user = new API.User(userID);
    
    it('should fetch user information', function (done) {
        
        user.get(function(user) {
            expect(user.fetched).toBe(true);
            expect(user.id).toBe(userID.toString());
            done();
        });
    });
    
    
    it('should fetch user image', function (done) {
        
        user.image.get(function(image) {
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
    
    
    
    it('should fetch user albums', function (done) {
        
        user.albums.get(function(albums) {
            console.log(albums);
            done();
        });
    });
    
});
