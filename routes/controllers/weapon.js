exports.getWeaponsJSON = function(req, res) {
  res.json(require('../../constants/game').MASTER);
};
