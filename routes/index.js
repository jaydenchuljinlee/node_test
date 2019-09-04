module.exports = function(app,Book) {

    //get all books
    app.get('/api/books',function(req,res) {
        res.end();
    });

    //get single book
    app.get('/api/books/:book_id',function(req,res) {
        res.end();
    });

    //get book by author
    app.get('/api/books/author/:author',function(req,res) {
        res.end();
    });

    //create book
    app.post('/api/books',function(req,res) {
        var book = new Book();
        book.title = req.body.name;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save(function(err) {
            if(err) {
                console.error(err);
                res.json({result:0});
                return;
            }

            res.json({result:1});
        });
    });

    //update the book
    app.put('/api/books/:book_id',function(req,res) {
        res.end();
    });

    //delete book
    app.delete('/api/books/:book_id',function(req,res) {
        res.end();
    });

}