module.exports = function(stockRepository){
    return {
        postStock: postStock,
        getStock: getStock,
        getCount: getCount
    };
    
    function postStock(req, res, next) {
        return stockRepository.
        stockUp(req.body.isbn, req.body.count).
        then(function() {
            res.json({ isbn: req.body.isbn, count: req.body.count });
        }).
        catch(next);
    }

    function getStock(req, res, next) {
        return stockRepository.
        findAll().
        then(function(results) {
            res.json(results);
        }).
        catch(next);
    }

    function getCount (req, res, next) {
        return stockRepository.
        getCount(req.params.isbn).
        then(function(result) {
            if (result === null || result === undefined) {
                next();
                // res.status(404).send('No book with isbn ' + req.params.isbn);
            } else {
                res.json({ count: result });
            }
        }).
        catch(next);
    }
};
