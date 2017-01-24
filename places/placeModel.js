var mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
  name: String,
  address: String,
});

module.exports = mongoose.model('Place', placeSchema);