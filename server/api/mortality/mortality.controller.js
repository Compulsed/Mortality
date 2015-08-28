/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /mortality              ->  index
 * POST    /mortality              ->  create
 * GET     /mortality/:id          ->  show
 * PUT     /mortality/:id          ->  update
 * DELETE  /mortality/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Mortality = require('./mortality.model');

// Get list of mortality
exports.index = function(req, res) {
  Mortality.find(function (err, mortality) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(mortality);
  });
};

// Get a single Mortality
exports.show = function(req, res) {
  Mortality.findById(req.params.id, function (err, mortality) {
    if(err) { return handleError(res, err); }
    if(!mortality) { return res.status(404).send('Not Found'); }
    return res.json(mortality);
  });
};

// Creates a new Mortality in the DB.
exports.create = function(req, res) {
  Mortality.create(req.body, function(err, mortality) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(Mortality);
  });
};

// Updates an existing Mortality in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mortality.findById(req.params.id, function (err, mortality) {
    if (err) { return handleError(res, err); }
    if(!mortality) { return res.status(404).send('Not Found'); }
    var updated = _.merge(mortality, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(mortality);
    });
  });
};

// Deletes a mortality from the DB.
exports.destroy = function(req, res) {
  Mortality.findById(req.params.id, function (err, mortality) {
    if(err) { return handleError(res, err); }
    if(!mortality) { return res.status(404).send('Not Found'); }
    mortality.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}