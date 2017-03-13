var assert = require('assert');
var sum = require('./sum').add;

describe ('Math in js', function(){
    it('should support adding', function(done){
        setTimeout(function(){
            var require
            assert.equal(sum(1,1), 2);
            done();
        }, 100);
    });
});