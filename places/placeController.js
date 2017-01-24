var Q = require('q');
var Place = require('./placeModel.js');

// Promisify a few mongoose methods with the `q` promise library
var createPlace = Q.nbind(Place.create, Place);
var findAllPlaces = Q.nbind(Place.find, Place);

module.exports = {

  allPlaces: function (req, res, next) {
    ('im trying to find all the places');
    findAllPlaces({})
      .then(function (places) {
        res.json(places);
      })
      .fail(function (error) {
        next(error);
      });
  },

  newPlace: function (req, res, next) {
    console.log('I am creating a newPlace');
    var name = req.body.name;
    var address = req.body.address;
    var newPlace = {
      name: name,
    };
    createPlace(newPlace)
    .then(function (createdPlace) {
      if (createdPlace) {
        res.json(createdPlace);
      }
    })
    .fail(function (error) {
      next(error);
    });
  }
};