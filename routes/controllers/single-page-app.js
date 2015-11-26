var gameInfo = require('../../constants/game'),
    pages = require('../../constants/pages');


exports.getIndex = function(req, res) {
  console.log('RETURNING HOME');
  res.render('pages/index', {
    title: 'Le Livre de Jeu du Maitre Kai',
    selectedNav: 'home'
  });
};

exports.getPartial = function(req, res) {
  var filename = req.params.filename;
  if(!filename) {
    res.json({ error: 'filename was wrong' });
  }

  console.log('PASSED INTO SERVER ROUTER');

  //ADD GAMEINFO MAYBE ?
  res.render("partials/" + filename );
};

