var express = require('express');

var app = express();
var MongoClient = require('mongodb').MongoClient;
var parser = require('body-parser');
app.use(parser.json());

function userErrorHandling (err, req, res, next){
    res.status(500).send(err.message);
}

app.use(userErrorHandling)

app.post('/books', function(req, res, next){
    
    var book = {
        isbn: req.body.isbn,
        id: req.body.id
    };

    var url = 'mongodb://localhost:27017/nodejs';
    MongoClient.connect(url, function(err, db) {
        console.log('polaczono do bazy')
        var collection = db.collection('books');
        collection.insertOne(book, function(err, result) {
            collection.find({}).toArray(function(err, books) {
                res.json(books);
                db.close();
            });
        });
    });
})

app.get('/sth', function(req, res, next){
    throw new Error('grubo spierdolone');
});

app.use(function(req, res){
    res.status(404).send('not found');
})

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});