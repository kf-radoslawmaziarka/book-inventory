module.exports = {
    bookUp: bookUp,
    all: all
}

function bookUp(db, book){
    var collection = db.collection('books');

    return collection.updateOne({isbn: book.isbn}, book, {upsert: true});
}

function all(db){
    var collection = db.collection('books');
    return collection.find({}).toArray();
}