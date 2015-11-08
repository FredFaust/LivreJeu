var game = require('../../constants/game'),
    mongodb = require('../../utilities/mongodb'),
    pages = require('../../constants/pages');

var validateInput = function(req, res, callback) {
  var prog = req.body;

  if (!_.contains(pages.pagesNumbers, prog.page)) {
    callback('Page invalide dans la progression', req, res);
    return false;
  }

  if (prog.endurance < 0) {
    callback('Endurance invalide dans la progression', req, res);
    return false;
  }

  if (prog.combatSkill < 0) {
    callback('Points d\'habilete invalide dans la progression', req, res);
    return false;
  }

  if (!prog.items || !_.isArray(prog.items)) {
    callback('Valeurs invalides', req, res);
    return false;
  }

  // It must be EXACTLY 2 items
  if (prog.items.length != 2) {
    callback("Nombre incorrect d'items... Nb items:" + prog.items.length, req, res);
    return false;
  }

  if (!_.every(prog.items, function(i) {
        return game.ITEMS.hasOwnProperty(i) || game.WORLD_ITEMS.hasOwnProperty(i);
      })) {
    callback("Equipement invalide dans la progression", req, res);
    return false;
  }

  return true;
};

var validationFailedCb = function(msg, req, res) {
  console.log(msg);
  res.status(422).send({ error: msg });
};

exports.postProgression = function(req, res) {
  if (validateInput(req, res, validationFailedCb)) {
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
  if (validateInput(req, res, validationFailedCb)) {
    mongodb.connect(function(db) {
      //Mise a jour d'un joueur dans la database
      mongodb.updatePlayer(req.params.playerid, req.body, db, function(err, result) {
        db.close();

        if (!err && result) {
          res.json({ player: result });
        } else if (err) {
          console.log('Error occurred while updating a player');
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