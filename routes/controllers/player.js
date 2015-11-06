var random = require('../../utilities/random'),
    game = require('../../constants/game'),
    mongodb = require('../../utilities/mongodb');

var renderInvalidPage = function(errorMessage, req, res) {
  console.log(errorMessage);

  req.session.errorMessage = errorMessage;

  res.status(200).send({
    redirect: '/game/0/'
  });
};

var validateInput = function(heroName, disciplines, items, req, res, callback) {
  if (!_.isString(heroName) || heroName.length === 0) {
    callback("Nom du hero invalide", req, res);
    return false;
  }

  if (!disciplines || !items) {
    callback('Valeurs invalides', req, res);
    return false;
  }

  if (!_.isArray(disciplines) || !_.isArray(items)) {
    callback('Valeurs invalides', req, res);
    return false;
  }

  // It must be EXACTLY 5 disciplines and 2 items
  if (disciplines.length != 5 || items.length != 2) {
    callback("Nombre incorrect de disciplines ou d'equipement... Disciplines: " + disciplines.length + ' Equipement: ' + items.length, req, res);
    return false;
  }

  if (!_.every(disciplines, function(d) {
        return game.DISCIPLINES.hasOwnProperty(d);
      })) {
    callback("Disciplines invalides dans le formulaire", req, res);
    return false;
  }

  if (!_.every(items, function(i) {
        return game.ITEMS.hasOwnProperty(i);
      })) {
    callback("Equipement invalide dans le formulaire", req, res);
    return false;
  }

  return true;
};

var mongoConnect = function(callback) {
  mongodb.client.connect(mongodb.url, function(err, db) {
    if (!err) {
      callback(db);
    } else {
      console.log('Unable to connect to database');
      console.log(err);
    }
  });
};

exports.postPlayer = function(req, res) {
  var heroName = req.body.name;
  var disciplines = req.body.disciplines;
  var items = req.body.items;
  var masteredWeapon = req.body.masteredWeapon;

  if (!validateInput(heroName, disciplines, items, req, res, renderInvalidPage)) {
    return;
  }

  var initialCombatSkill = random.getIntInclusive(0, 9) + 10,
      actualCombatSkill = initialCombatSkill,
      initialEndurance = random.getIntInclusive(0, 9) + 10,
      actualEndurance = initialEndurance;

  if (_.contains(disciplines, 'ARMS_CONTROL') && _.contains(items, masteredWeapon)) {
    actualCombatSkill += 2;
  }

  if (_.contains(items, 'QUILTED_LEATHER_VEST')) {
    actualEndurance += 2;
  }

  var player = {
    name: heroName,
    combatSkill: {
      initial: initialCombatSkill,
      actual: actualCombatSkill
    },
    endurance: {
      initial: initialEndurance,
      actual: actualEndurance
    },
    items: items,
    disciplines: disciplines,
    masteredWeapon: masteredWeapon
  };

  mongoConnect(function(db) {
    //Enregistrement dans la database
    mongodb.insertPlayer(player, db, function(err, result) {
      db.close();

      if (!err && result) {
        if (result.insertedCount) {
          console.log('Player inserted in the collection');
          //Enregistrement de l'identifiant du joueur sur la session
          req.session.hero = result.insertedId;

          //Les données associé au formulaire étaient valides, on redirige donc l'utilisateur vers la première page du jeu
          res.status(200).send({ redirect: '/game/1' });
        } else {
          renderInvalidPage('Le joueur n\'a pas plus etre cree dans la base de donnees...', req, res);
        }
      } else if (err) {
        console.log('Error occurred while inserting a player');
        console.log(err);
        renderInvalidPage('Probleme lors de la creation du joueur, veuillez re-essayer! ;)', req, res);
      }
    });
  });
};


exports.getPlayerJSON = function(req, res) {
  mongoConnect(function(db) {
      //Recherche dans la database
      mongodb.findPlayer(req.params.id, db, function(err, result) {
        db.close();

        if (!err && result) {
          res.json(result);
        } else if (err) {
          console.log('Error occurred while retrieving a player');
          console.log(err);

          if (err.errorId){
            res.status(400).send({ error: err.errorId });
          } else {
            res.status(200).send({ error: err.message });
          }
        }
      });
  });
};

exports.putPlayer = function(req, res) {
  if (validateInput(req.body.name, req.body.disciplines, req.body.items, req, res, function() {})) {
    mongoConnect(function(db) {
      //Mise a jour d'un joueur dans la database
      mongodb.updatePlayer(req.params.id, req.body, db, function(err, result) {
        db.close();

        if (!err && result) {
          res.json({player: result});
        } else if (err) {
          console.log('Error occurred while updating a player');
          console.log(err);

          if (err.errorId){
            res.status(400).send({ error: err.errorId });
          } else {
            res.status(200).send({ error: err.message });
          }
        }
      });
    });
  } else {
    res.status(422).send({
      error: "Input was invalid"
    });
  }
};

exports.deletePlayer = function(req, res) {
  mongoConnect(function(db) {
    //Suppresion d'un joueur dans la database
    mongodb.deletePlayer(req.params.id, db, function(err, result) {
      db.close();

      if (!err && result) {
        if (result.result.ok) {
          if (result.result.n) {
            res.status(200).send({
              message: "Player deleted"
            });
          } else {
            res.status(200).send({
              message: "Player not found"
            });
          }
        }
      } else if (err) {
        console.log('Error occurred while deleting a player');
        console.log(err);

        if (err.errorId){
          res.status(400).send({ error: err.errorId });
        } else {
          res.status(200).send({ error: err.message });
        }
      }
    });
  });
};

exports.getPlayersJSON = function(req, res) {
  mongoConnect(function(db) {
    //Recherche dans la database
    mongodb.getPlayers(db, function(err, result) {
      db.close();

      if (!err && result) {
        res.json({players: result});
      } else if (err) {
        console.log('Error occurred while retrieving player(s)');
        console.log(err);
        res.status(200).send({ error: err.message });
      }
    });
  });
};

