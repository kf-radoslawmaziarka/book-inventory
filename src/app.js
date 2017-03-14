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
    var app = express();

    app.use(bodyParser.json());

    app.post('/stock', function(req, res, next) {
        stockRepository.
        stockUp(req.body.isbn, req.body.count).
        then(function() {
            res.json({ isbn: req.body.isbn, count: req.body.count });
        }).
        catch(next);
    });

    app.get('/stock', function(req, res, next) {
        stockRepository.
        findAll().
        then(function(results) {
            res.json(results);
        }).
        catch(next);
    });

    app.get('/stock/:isbn', function(req, res, next) {
        stockRepository.
        getCount(req.params.isbn).
        then(function(result) {
            if (result == null) {
                next();
                // res.status(404).send('No book with isbn ' + req.params.isbn);
            } else {
                res.json({ count: result });
            }
        }).
        catch(next);
    });

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