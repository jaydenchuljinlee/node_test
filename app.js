//load packages
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

//configure app to use bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//configure server port
var port = process.env.port || 8080;

//define model
var Book = require('./models/book');

//configure router
var router = require('./routes')(app,Book);

//connect to mongoDB server
var db = mongoose.connection;
db.on('error',console.error);
db.once('open',function() {
    //connected to mongoDB server
    console.log("Connected to mongoDB server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial',{ useNewUrlParser: true });

//run server
var server = app.listen(port,function() {
    console.log('Express server has started on port' + port);
});


