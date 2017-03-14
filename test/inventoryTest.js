var request = require('supertest');

describe('Book inventory', function() {
    it('allows to stock up the items', function(done) {
        var repo = require('../src/inMemoryStockRepository')();
        var app = require('../src/app')(repo);
        
        request(app).
        post('/stock').
        set('Accept', 'application/json').
        send({ isbn: '1234', count: 10 }).
        expect(200, { isbn: '1234', count: 10 }, done);
    });

    it('get item', function(done) {
        var repo = require('../src/inMemoryStockRepository')();
        repo._items([{isbn:'4321', count: 1}]);
        var app = require('../src/app')(repo);

        request(app).
        get('/stock/4321').
        set('Accept', 'application/json').
        expect(200, { count: 1 }, done);
    });
});