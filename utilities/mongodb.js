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
    callback({ errorId: 'Id was invalid...' }, null );
    return false;
  }
  return true;
};

module.exports = {
  client: require('mongodb').MongoClient,
  url: 'mongodb://felfaust:4420@ds049854.mongolab.com:49854/tp_log4420',
  collections: {
    players: 'players',
    progressions: 'progressions'
  },
  connect: function(callback) {
    this.client.connect(this.url, function(err, db) {
      if (!err) {
        callback(db);
      } else {
        console.log('Unable to connect to database');
        console.log(err);
      }
    });
  },
  insertPlayer: function(player, db, callback) {
    db.collection(this.collections.players).insertOne(player, function(err, result) {
      dbCallback(err, result, callback);
    });
  },
  findPlayer: function(id, db, callback) {
    if (validateId(id, callback)) {
      db.collection(this.collections.players).find({ _id : ObjectId(id) }).limit(1).next(function(err, doc) {
        dbCallback(err, doc, callback);
      });
    }
  },
  updatePlayer: function(id, player, db, callback) {
    if (validateId(id, callback)) {
      db.collection(this.collections.players).updateOne({ _id: ObjectId(id) }, player, function(err, result) {
        dbCallback(err, result, callback);
      });
    }
  },
  deletePlayer: function(id, db, callback) {
    if (validateId(id, callback)) {
      db.collection(this.collections.players).deleteOne({ _id : ObjectId(id) }, function(err, result) {
        if (err) {
          dbCallback(err, result, callback);
        } else {
          db.collection('progressions').deleteOne({ playerId : id }, function(error, res) {
            dbCallback(error, res, callback);
          });
        }
      });
    }
  },
  getPlayers: function(db, callback) {
    db.collection(this.collections.players).find().toArray(function(err, docs) {
      dbCallback(err, docs, callback);
    });
  },
  getProgressions: function(db, callback) {
    db.collection(this.collections.progressions).find().toArray(function(err, docs) {
      dbCallback(err, docs, callback);
    });
  },
  insertProgression: function(prog, db, callback) {
    if (validateId(prog.playerId, callback)) {
      db.collection(this.collections.progressions).insertOne(prog, function(err, result) {
        dbCallback(err, result, callback);
      });
    }
  },
  findProgression: function(id, db, callback) {
    if (validateId(id, callback)) {
      db.collection(this.collections.progressions).find({ playerId : id }).limit(1).next(function(err, doc) {
        dbCallback(err, doc, callback);
      });
    }
  },
  deleteProgression: function(id, db, callback) {
    if (validateId(id, callback)) {
      db.collection(this.collections.progressions).deleteOne({ playerId : id }, function(err, result) {
        if (err) {
          dbCallback(err, result, callback);
        } else {
          db.collection('players').deleteOne({ _id : ObjectId(id) }, function(error, res) {
            dbCallback(error, res, callback);
          });
        }
      });
    }
  }
};