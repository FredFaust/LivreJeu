var mongodb = require('../../utilities/mongodb'),
    validation = require('../../utilities/validation');

var validationFailedCb = function(msg, req, res) {
  console.log(msg);
  res.status(422).send({ error: msg });
};

exports.postProgression = function(req, res) {
  if (validation.initialValidateProgression(req.body, req, res, validationFailedCb)) {
    mongodb.connect(function(db) {
      //Recherche dans la database
      mongodb.insertProgression(req.body, db, function(err, result) {
        db.close();

        if (!err && result && result.insertedCount) {
          console.log('Progression inserted in the collection');
          res.status(200).send({ _id: result.insertedId });
        } else if (err) {
          console.log('Error occurred while inserting a progression');
          console.log(err);
          res.status(200).send(err);
        }
      });
    });
  }
};

exports.getProgression = function(req, res) {
  mongodb.connect(function(db) {
    //Recherche dans la database
    mongodb.findProgression(req.params.playerid, db, function(err, result) {
      db.close();

      if (!err && result) {
        res.json(result);
      } else if (err) {
        console.log('Error occurred while retrieving a progression');
        console.log(err);

        if (err.errorId) {
          res.status(400).send({ error: err.errorId });
        } else {
          res.status(200).send({ error: err.message });
        }
      }
    });
  });
};

exports.getProgressions = function(req, res) {
  mongodb.connect(function(db) {
    //Recherche dans la database
    mongodb.getProgressions(db, function(err, result) {
      db.close();

      if (!err && result) {
        res.json({ progressions: result });
      } else if (err) {
        console.log('Error occurred while retrieving progression(s)');
        console.log(err);
        res.status(200).send({ error: err.message });
      }
    });
  });
};


exports.putProgression = function(req, res) {
  if (validation.validateProgression(req.body, req, res, validationFailedCb)) {
    mongodb.connect(function(db) {
      //Mise a jour d'une progression dans la database
      mongodb.updateProgression(req.params.playerid, req.body, db, function(err, result) {
        db.close();

        if (!err && result) {
          res.json({ progression: result });
        } else if (err) {
          console.log('Error occurred while updating a progression');
          console.log(err);

          if (err.errorId) {
            res.status(400).send({ error: err.errorId });
          } else {
            res.status(200).send({ error: err.message });
          }
        }
      });
    });
  }
};

exports.deleteProgression = function(req, res) {
  mongodb.connect(function(db) {
    //Suppresion d'un joueur dans la database
    mongodb.deleteProgression(req.params.playerid, db, function(err, result) {
      db.close();

      if (!err && result) {
        if (result.result.ok) {
          if (result.result.n) {
            res.status(200).send({
              message: "Progression deleted"
            });
          } else {
            res.status(200).send({
              message: "Progression not found"
            });
          }
        }
      } else if (err) {
        console.log('Error occurred while deleting a progression');
        console.log(err);

        if (err.errorId) {
          res.status(400).send({ error: err.errorId });
        } else {
          res.status(200).send({ error: err.message });
        }
      }
    });
  });
};