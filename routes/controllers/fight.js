var rand = require('../../utilities/random'),
    fight = require('../../constants/fight');

exports.getFight = function(req, res) {
  res.render('pages/fight', {
    title: 'Combat',
    heroname: req.query.heroname || 'Felix le Vainqueur',
    returnPage: req.query.return_page,
    returnSection: req.query.return_section,
    name: req.query.name,
    ability: req.query.ability, endurance: req.query.endurance, selectedNav: 'game'
  });
};

exports.getFightJSON = function(req, res) {
  var combatRatio = parseInt(req.params.player, 10) - parseInt(req.params.enemy, 10),
      absCombatRatio = Math.abs(combatRatio),
      random = rand.getIntInclusive(0, 9),
      enduranceLostPlayer,
      enduranceLostEnemy;

  var table = combatRatio < 0 ? fight.combatRatioNeg : fight.combatRatioPos;

  if (absCombatRatio > 11) {
    absCombatRatio = 11;
  }
  
  enduranceLostEnemy = table[random][absCombatRatio][0];
  enduranceLostPlayer = table[random][absCombatRatio][1];

  // Une valeur de 999 indique dans le cas present que c'est une mort assuree, donc on envoit 'K',
  // comme dans les figures presentees dans l'enonce.
  res.json(JSON.stringify({
    combatRatio: combatRatio,
    randomNumber: random,
    enduranceLost: {
      player: enduranceLostPlayer === 999 ? 'K' : enduranceLostPlayer,
      enemy: enduranceLostEnemy === 999 ? 'K' : enduranceLostEnemy
    }
  }));
};
