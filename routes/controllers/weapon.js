exports.getWeaponsJSON = function(req, res) {
  res.json(JSON.stringify(require('../../constants/game').MASTER));
};
