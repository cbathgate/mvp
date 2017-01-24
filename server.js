var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var placeController = require('./places/placeController.js');

var app = express();


// connect to mongo database named "findmefood"
mongoose.connect('mongodb://localhost/findmefood');

//middle-ware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/client')));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  return next();
});

app.get('/api/places/', placeController.allPlaces);

app.post('/api/places/', placeController.newPlace);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});