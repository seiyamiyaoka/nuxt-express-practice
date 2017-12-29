var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json())

// config/database.config.jsで定義したものを要求
var dbConfig = require('./config/database.config.js');
// mongodbを要求
var mongoose = require('mongoose');
// mongodb設定
mongoose.connect(dbConfig.url, {
    useMongoClient: true
});

// mongodbの接続エラーだった場合
mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// mongodbの接続できた場合
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// ここでurlを設定している

require('./app/routes/note.routes.js')(app)
// listen for requests
app.listen(3001, function(){
    console.log("Server is listening on port 3000");
});
