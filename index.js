var express = require('express');

var app = express();
var MongoClient = require('mongodb').MongoClient;
var parser = require('body-parser');
var url = 'mongodb://localhost:27017/nodejs';
var bookRepo = require('./booksRepository');

MongoClient.connect(url).then(function(db) {
    app.db = db;
});

app.use(parser.json());

function userErrorHandling (err, req, res, next){
    res.status(500).send(err.message);
}

app.use(userErrorHandling);

app.post('/books', function(req, res, next){
    
    var book = {
        isbn: req.body.isbn,
        count: req.body.count
    };

    bookRepo.bookUp(req.app.db, book)
    .then(function(){
        res.json(book);
    });
})

app.get('/books', function(req, res, next){ 

    bookRepo.all(req.app.db)
    .then(function(books) {
        res.json(books);
    })
});

app.use(function(req, res){
    res.status(404).send('not found');
})

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});