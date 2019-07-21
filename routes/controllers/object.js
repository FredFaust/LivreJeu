var gameInfo = require('../../constants/game');

exports.getMasterWeaponsJSON = function (_req, res) {
  res.json(JSON.stringify(gameInfo.MASTER));
};

exports.getGameInfoJSON = function (_req, res) {
  res.json(JSON.stringify(gameInfo));
};
