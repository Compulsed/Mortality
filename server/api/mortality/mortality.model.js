'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// {dateAdded, name, inputDate, daysAlive}
var MortalitySchema = new Schema({
  dateAdded: Date,
  name: String,
  lastName: String,
  inputDate: Date,
  daysAlive: Number
});

module.exports = mongoose.model('Mortality', MortalitySchema);
