var async = require('async');

// Adds a particular field
exports.up = function(db, next){
  var mortalities = db.collection('mortalities');

  async.parallel([
      function(callback){
        mortalities.update(
          {},
          { $set : { lastName: "" }},
          { multi: true },
          callback.bind(null)
        );
      }
  ],

  // Finished working
  function(err, results){
    next();
  });

};

exports.down = function(db, next){
  var mortalities = db.collection('mortalities');

  async.parallel([
      function(callback){
        mortalities.update(
          {},
          { $unset : { lastName: 1}},
          { multi: true },
          callback.bind(null)
        );
      }
  ],

  // Finished working
  function(err, results){
    next();
  });

};
