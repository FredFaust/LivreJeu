var random = require('../../utilities/random'),
    game = require('../../constants/game');

exports.postPlayer = function(req, res) {
  var heroName = req.body.name;
  var disciplines = req.body.disciplines;
  var items = req.body.items;
  var masteredWeapon = req.body.masteredWeapon;

  var renderInvalidPage = function(errorMessage) {
    console.log(errorMessage);

    req.session.errorMessage = errorMessage;

    res.status(200).send({
      redirect: '/game/0/'
    });
  };

  if (!_.isString(heroName) || heroName.length === 0) {
    renderInvalidPage("Nom du hero invalide");
    return;
  }

  if (!disciplines || !items) {
    renderInvalidPage('Valeurs invalides');
    return;
  }

  if (!_.isArray(disciplines) || !_.isArray(items)) {
    renderInvalidPage('Valeurs invalides');
    return;
  }

  // It must be EXACTLY 5 disciplines and 2 items
  if (disciplines.length != 5 || items.length != 2) {
    renderInvalidPage("Nombre incorrect de disciplines ou d'equipement... Disciplines: " + disciplines.length + ' Equipement: ' + items.length);
    return;
  }

  if (!_.every(disciplines, function(d) {
        return game.DISCIPLINES.hasOwnProperty(d);
      })) {
    renderInvalidPage("Disciplines invalides dans le formulaire");
    return;
  }

  if (!_.every(items, function(i) {
        return game.ITEMS.hasOwnProperty(i);
      })) {
    renderInvalidPage("Equipement invalide dans le formulaire");
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

  //Enregistrement du joueur sur la session
  req.session.hero = {
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

  //Les données associé au formulaire étaient valides, on redirige donc l'utilisateur vers la première page du jeu
  res.status(200).send({redirect: '/game/1'});
};

exports.getPlayerJSON = function(req, res) {
  res.json(req.session.hero ? JSON.stringify(req.session.hero) : {});
};
