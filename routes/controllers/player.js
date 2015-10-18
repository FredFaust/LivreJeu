var random = require('../../utilities/random');

exports.postPlayer = function(req, res) {
  var disciplines = req.body.disciplines;
  var items = req.body.items;
  var masteredWeapon = req.body.weapon;

  console.log(items.toString());

  // TODO : Maybe refactor this, we need to indicate that the form was not valid on client side
  // TODO : Yeah, refactor !
  var renderInvalidPage = function(errorMessage) {
    console.log(errorMessage);
    res.render('pages/book/p0', {selectedNav: 'game', invalidForm: true});
  };

  if (!disciplines || !items) {
    renderInvalidPage('Items or disciplines is null or undefined...');
    return;
  }

  if (!Array.isArray(disciplines) || !Array.isArray(items)) {
    renderInvalidPage('Items or disciplines is not an array...');
    return;
  }

  // It must be EXACTLY 5 disciplines and 2 items
  if (disciplines.length != 5 || items.length != 2) {
    renderInvalidPage('Incorrect number of disciplines or items... Disciplines: ' + disciplines.length + ' Items: ' + items.length);
    return;
  }

  var validateArray = function(array, container, errorMessage) {
    var validElements = true;
    for (var i = 0; i < array.length; i++) {
      var elem = array[i];
      if (!container.hasOwnProperty(elem)) {
        validElements = false;
        break;
      }
    }
    return validElements;
  };

  /* Validate disciplines and items
   e.g. {
   "disciplines" :  [ "CAMOUFLAGE", "HUNT", "SIXTH_SENSE", "ORIENTATION", "HEALING" ],
   "items" : ["SWORD", "SABRE"]
   }
   -> VALID
   {
   "disciplines" :  [ "WHAT", "YOLO", "HUEHUE", "ORIENTATION", "HEALING" ],
   "items" : ["SWORD", "SABRUH"]
   }
   -> INVALID */
  if (!validateArray(disciplines, game.DISCIPLINES, "Invalid discipline was found! ")) {
    renderInvalidPage("Invalid disciplines were found in submitted form.");
    return;
  }

  if (!validateArray(items, game.ITEMS, "Invalid item was found! ")) {
    renderInvalidPage("Invalid items were found in submitted form.");
    return;
  }

  var initialCombatSkill = random.getIntInclusive(0, 9) + 10,
      initialEndurance = random.getIntInclusive(0, 9) + 10,
      weapon = {controls: false, type: null};

  console.log("CS : " + initialCombatSkill + " EN : " + initialEndurance);

  //TODO Fix this
  // If the user choose this discipline and possesses the appropriate weapon, he gains two points of ability for the specified weapon;
  if (masteredWeapon && items[masteredWeapon] !== undefined && items[masteredWeapon] !== null &&
      disciplines[game.DISCIPLINES.ARMS_CONTROL] !== undefined && disciplines[game.DISCIPLINES.ARMS_CONTROL] !== null) {
    weapon.controls = true;
    weapon.type = masteredWeapon;
    console.log("Mastered weapon: " + weapon.type);
  }

  //TODO Fix this
  if (items[game.ITEMS.QUILTED_LEATHER_VEST] !== undefined && items[game.ITEMS.QUILTED_LEATHER_VEST] !== null) {
    console.log("Endurance was boosted because of quilted vest!");
    initialEndurance += 2;
  }

  var initialPlayer = {
    combatSkill: {
      initial: initialCombatSkill,
      actual: initialCombatSkill
    },
    endurance: {
      initial: initialEndurance,
      actual: initialEndurance
    },
    items: items,
    disciplines: disciplines,
    weapon: weapon
  };

  req.session.hero = initialPlayer;

  //TODO Maybe adjust this
  res.end();
};
