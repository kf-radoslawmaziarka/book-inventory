var request = require('supertest');
request = request('http://localhost:3000');


describe ('Express', function(){
    it('should return posted data', function(done){
        request
            .post('/books')
            .send({ isbn: '123123' })
            .expect({ isbn: '123123' }, done);
    });
});
