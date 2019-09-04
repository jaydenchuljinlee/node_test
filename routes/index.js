module.exports = function(app,Book) {

    //get all books
    app.get('/api/books',function(req,res) {
        Book.find(function(err,books) {
            if(err) return res.status(500).send({error:'database failure'});
            res.json(books);
        });
    });

    //get single book
    app.get('/api/books/:book_id',function(req,res) {
        Book.findOne({_id : req.params.book_id},function(err,book) {
            if(err) return res.status(500).json({error:err});
            if(!book) return res.status(404).json({error : 'book is not found'});
            res.json(book);
        })
    });

    //get book by author
    app.get('/api/books/author/:author',function(req,res) {
        Book.findOne({author:req.params.author},{_id:0,author:1,published_date:1},function(err,books) {
            if(err) return res.status(500).json({error:err});
            if(books.length == 0) return res.status(404).json({error : 'book is not fount'});
            res.json(books);
        })
    });

    //create book
    app.post('/api/books',function(req,res) {
        var book = new Book();

        book.title = req.body.name;
        book.author = req.body.author;
        book.published_date =  new Date(req.body.published_date)

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
        Book.findById(req.params.book_id, function(err,book) {
            if(err) return res.status(500).json({error : 'database failure'});
            if(!book) return res.status(404).json({error : 'book is not found'});

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save(function(err) {
                if(err) return res.status(500).json({error : 'failed to update'});
                res.json({message : 'book updated'});
            });
        })

        // 어플리케이션에서 기존 document를 굳이 조회할 필요가 없다면,
       // Book.update({ _id: req.params.book_id }, { $set: req.body }, function(err, output){
        //    if(err) res.status(500).json({ error: 'database failure' });
          //  console.log(output);
            //if(!output.n) return res.status(404).json({ error: 'book not found' });
            //res.json( { message: 'book updated' } );
        //})
    });

    //delete book
    app.delete('/api/books/:book_id',function(req,res) {
        Book.remove({_id : req.params.book_id},function(err,output) {
            if(err) return res.status(500).json({error : 'datatbase failure'});

            res.status(204).end();
        })
    });

}