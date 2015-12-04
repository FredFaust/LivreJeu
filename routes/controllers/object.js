var gameInfo = require('../../constants/game');

exports.getMasterWeaponsJSON = function(req, res) {
  res.json(JSON.stringify(gameInfo.MASTER));
};

exports.getGameInfoJSON = function(req, res) {
  res.json(JSON.stringify(gameInfo));
};
