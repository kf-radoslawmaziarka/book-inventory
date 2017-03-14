var assert = require('assert');

describe('Stock controller', function() {
    describe('get count', function(){
        it('returns count if book found', function(done) {
            var repo = {
                getCount: function(isbn){
                    console.log(isbn);
                    assert.equal(isbn, 1234);

                    var promise = new Promise(function(resolve){
                        resolve(1);
                    });

                    return promise;
                }
            };
            var ctrl = require('../src/api/stockController')(repo);

            var request = {
                params: {
                    isbn: '1234'
                }
            };

            var response = {
                json: function(obj){
                    assert.deepEqual(obj, {count: 1});
                    done();
                }
            };

            ctrl.getCount(request, response, null).catch(done);
        });

        it('calls next if book not found', function(done) {
            var repo = {
                getCount: function(){
                    var promise = new Promise(function(resolve){
                        resolve(null);
                    });

                    return promise;
                }
            };
            var ctrl = require('../src/api/stockController')(repo);

            var request = {
                params: {

                }
            };

            var next = function(){
                done();
            };

            ctrl.getCount(request, null, next).catch(done);
        });
    });
});