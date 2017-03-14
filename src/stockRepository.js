var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/nodejs';

var collection = MongoClient.connect(url, { bufferMaxEntries: 0 }).then(function(db) {
    return db.collection('books');
});
collection.then(function() {
    console.log("connection to DB established");
}).catch(function(err) {
    console.error(err);
    process.exit(1);
});

module.exports = {
    stockUp: function(isbn, count) {
        return collection.
        then(function(collection) {
            return collection.updateOne({ isbn: isbn }, {
                isbn: isbn,
                count: count
            }, { upsert: true });
        });
    },
    findAll: function() {
        return collection.
        then(function(collection) {
            return collection.find({}).toArray();
        });
    },
    getCount: function(isbn) {
        return collection.then(function(collection) {
            return collection.find({ "isbn": isbn }).limit(1).next();
        }).then(function(result) {
            return result && result.count;
            // if (result == null) {
            //     return null;
            // } else {
            //     return result.count;
            // }
        });
    }
};