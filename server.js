var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// routers
var calculatorRouter = require('./routes/calculator');

var app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// using the routers
app.use('/math', calculatorRouter);

// set public/index.html as client
app.get('/', function(req, res){
  var filename = path.join(__dirname, 'public/views/index.html');
  res.sendFile(filename);
});

// set the project to localhost:3000
app.listen(3000);
