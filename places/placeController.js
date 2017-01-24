var Q = require('q');
var Place = require('./placeModel.js');

// Promisify a few mongoose methods with the `q` promise library
var createPlace = Q.nbind(Place.create, Place);
var findAllPlaces = Q.nbind(Place.find, Place);
var deleteAllPlaces = Q.nbind(Place.remove, Place);

module.exports = {

  deletePlaces: function(req, res, next) {
    deleteAllPlaces({})
      .then(function(response) {
        response.json(response);
      });
  },

  allPlaces: function (req, res, next) {
    findAllPlaces({})
      .then(function (places) {
        res.json(places);
      })
      .fail(function (error) {
        next(error);
      });
  },

  newPlace: function (req, res, next) {
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