var express = require('express');

var app = express();

function userErrorHandling (err, req, res, next){
    res.status(500).send(err.message);
}

app.use(userErrorHandling)

app.get('/sth', function(req, res, next){
    throw new Error('grubo spierdolone');
});

app.use(function(req, res){
    res.status(404).send('not found');
})

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});