var ObjectId = require('mongodb').ObjectID;

var dbCallback = function(err, res, cb) {
  if (err){
    cb(err, null);
  } else{
    cb(null, res);
  }
};

var validateId = function(id, callback) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)){
    callback( { errorId: 'Id was invalid...' }, null );
    return false;
  }
  return true;
};

module.exports = {
  client: require('mongodb').MongoClient,
  url: 'mongodb://felfaust:4420@ds049854.mongolab.com:49854/tp_log4420',

  insertPlayer: function(player, db, callback) {
    db.collection('players').insertOne(player, function(err, result) {
      dbCallback(err, result, callback);
    });
  },
  findPlayer: function(id, db, callback) {
    if (validateId(id, callback)) {
      db.collection('players').find({ _id : ObjectId(id) }).limit(1).next(function(err, doc) {
        dbCallback(err, doc, callback);
      });
    }
  },
  updatePlayer: function(id, player, db, callback) {
    if (validateId(id, callback)) {
      db.collection('players').updateOne({_id: ObjectId(id)}, player, function(err, result) {
        dbCallback(err, result, callback);
      });
    }
  },
  deletePlayer: function(id, db, callback) {
    if (validateId(id, callback)) {
      db.collection('players').deleteOne({ _id : ObjectId(id) }, function(err, result) {
        dbCallback(err, result, callback);
      });
    }
  },
  getPlayers: function(db, callback) {
    db.collection('players').find().toArray(function(err, docs) {
      dbCallback(err, docs, callback);
    });
  }
};