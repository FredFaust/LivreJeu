exports.getWeapons = function(req, res) {
  res.send(require('../../constants/game').MASTER);
};
