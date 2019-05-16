var random = require('../../utilities/random'),
    mongodb = require('../../utilities/mongodb'),
    validation = require('../../utilities/validation');

var renderInvalidPage = function(errorMessage, req, res) {
  req.session.errorMessage = errorMessage;

  res.status(200).send({
    redirect: '/create'
  });
};

exports.postPlayer = function(req, res) {
  var heroName = req.body.name;
  var disciplines = req.body.disciplines;
  var items = req.body.items;
  var masteredWeapon = req.body.masteredWeapon;
  var speciaObjects = [];

  if (validation.validatePlayer(heroName, disciplines, req, res, renderInvalidPage) && validation.validateItems(items, req, res, renderInvalidPage)) {
    var initialCombatSkill = random.getIntInclusive(0, 9) + 10,
        actualCombatSkill = initialCombatSkill,
        initialEndurance = random.getIntInclusive(0, 9) + 10,
        actualEndurance = initialEndurance;

    if (_.contains(disciplines, 'ARMS_CONTROL') && _.contains(items, masteredWeapon)) {
      actualCombatSkill += 2;
    }

    if (_.contains(items, 'QUILTED_LEATHER_VEST')) {
      actualEndurance += 2;
      items = _.without(items, 'QUILTED_LEATHER_VEST');
      speciaObjects.push('QUILTED_LEATHER_VEST');
    }

    var player = {
      name: heroName,
      combatSkill: initialCombatSkill,
      endurance: initialEndurance,
      disciplines: disciplines
    };

    if (masteredWeapon) {
      player.masteredWeapon = masteredWeapon;
    }

    //TEMPLATE FOR FIGHTS :
    //"fights": [
    //  {
    //    "id": 1,
    //    "versus": "BAKANAL",
    //    "finished": true,
    //    "result": "Victoire"
    //    "rounds": [
    //      {
    //        "number": 1,
    //        "playerHP": 15,
    //        "playerDMG": 20,
    //        "enemyHP": 20,
    //        "enemyDMG": 7
    //      }]
    //  }, {
    //    "id": 2,
    //    "versus": "LANGUABARB",
    //    "finished": true,
    //    "result": "Victoire"
    //    "rounds": [
    //      {
    //        "number": 1,
    //        "playerHP": 10,
    //        "playerDMG": 25,
    //        "enemyHP": 16,
    //        "enemyDMG": 9
    //      }]
    //  }
    //],

    var createProgression = function(db) {
      var prog = {
        playerId: req.session.playerId,
        endurance: actualEndurance,
        combatSkill: actualCombatSkill,
        items: items,
        specialObjects: speciaObjects,
        fights: [],
        random: {},
        page: 1,
        previousPage: 1,
        money: 0
      };

      mongodb.insertProgression(prog, db, function(err, result) {
        db.close();

        if (!err && result && result.insertedCount) {
          //Les donn�es associ� au formulaire �taient valides, on redirige donc l'utilisateur vers la premi�re page du jeu
          var data = {
            redirect: '/story/1/1',
            player: player,
            progression: prog
          };

          res.status(200).send(data);
        } else if (err) {
          console.error('Error occurred while inserting a progression');
          console.error(err);
          renderInvalidPage(err, req, res);
        }
      });
    };

    var createPlayer = function(db) {
      //Enregistrement dans la database
      mongodb.insertPlayer(player, db, function(err, result) {
        db.close();

        if (!err && result) {
          if (result.insertedCount) {
            //Enregistrement de l'identifiant du joueur sur la session
            req.session.playerId = String(result.insertedId);

            mongodb.connect(createProgression);
          } else {
            renderInvalidPage('Le joueur n\'a pas plus etre cree dans la base de donnees...', req, res);
          }
        } else if (err) {
          console.error('Error occurred while inserting a player');
          console.error(err);
          renderInvalidPage('Probleme lors de la creation du joueur, veuillez re-essayer! ;)', req, res);
        }
      });
    };

    mongodb.connect(createPlayer);
  }
};

exports.getPlayerJSON = function(req, res) {
  mongodb.connect(function(db) {
      //Recherche dans la database
      mongodb.findPlayer(req.params.id, db, function(err, result) {
        db.close();

        if (!err && result) {
          res.json(result);
        } else if (err) {
          console.error('Error occurred while retrieving a player');
          console.error(err);

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
  if (validation.validatePlayer(req.body.name, req.body.disciplines, req, res, function() {})) {
    mongodb.connect(function(db) {
      //Mise a jour d'un joueur dans la database
      mongodb.updatePlayer(req.params.id, req.body, db, function(err, result) {
        db.close();

        if (!err && result) {
          res.json({player: result});
        } else if (err) {
          console.error('Error occurred while updating a player');
          console.error(err);

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
  mongodb.connect(function(db) {
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
        console.error('Error occurred while deleting a player');
        console.error(err);

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
  mongodb.connect(function(db) {
    //Recherche dans la database
    mongodb.getPlayers(db, function(err, result) {
      db.close();

      if (!err && result) {
        res.json({ players: result });
      } else if (err) {
        console.error('Error occurred while retrieving player(s)');
        console.error(err);
        res.status(200).send({ error: err.message });
      }
    });
  });
};

