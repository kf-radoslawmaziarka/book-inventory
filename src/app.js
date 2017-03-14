var express = require('express');
var bodyParser = require('body-parser');


function logger(req, res, next) {
    console.log("incoming GET request at ", new Date());
    next();
}

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

var serverError = function(err, req, res, next) {
    console.error(err.stack);
    var status = err.status || 500;
    res.status(status).send('Oh no: ' + status);
};

module.exports = function(stockRepository) {
    var stockController = require('./api/stockController')(stockRepository);

    var app = express();

    app.use(bodyParser.json());

    app.post('/stock', stockController.postStock);

    app.get('/stock', stockController.getStock);

    app.get('/stock/:isbn', stockController.getCount);

    app.get('/', logger, function(req, res) {
        res.send('Hello World!');
    });

    app.get('/error', function(req, res, next) {
        throw "error";
    });

    app.use(clientError);
    app.use(serverError);

    return app;
};