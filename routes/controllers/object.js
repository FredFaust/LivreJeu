exports.getMasterWeaponsJSON = function(req, res) {
  res.json(JSON.stringify(require('../../constants/game').MASTER));
};

exports.getGameInfoJSON = function(req, res) {
  console.log('called GET gameinfo JSON');
  res.json(JSON.stringify(require('../../constants/game')));
};
