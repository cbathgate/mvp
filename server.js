var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/client')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})