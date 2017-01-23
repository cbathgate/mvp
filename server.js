var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

//connect to mongo database named 'findMeFood'
//next priority: database connection
//mongoose.connect('mongodb://localhost/findMeFood')

app.get('*', function(req, res) {
  res.sendfile('client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})