var gameInfo = require('../../constants/game'),
    pages = require('../../constants/pages');


exports.getIndex = function(req, res) {
  res.render('pages/index', {
    title: 'Le Livre de Jeu du Maitre Kai'
  });
};

exports.getPartial = function(req, res) {
  var name = req.params.name;
  if(!name) {
    res.json({ error: 'filename was wrong' });
  }

  console.log('bonour');

  //ADD GAMEINFO MAYBE ?
  res.render("partials/" + name, { gameInfo: gameInfo });
};

exports.getHelpPartial = function(req, res) {
  var name = req.params.name;
  if(!name) {
    res.json({ error: 'filename was wrong' });
  }

  //ADD GAMEINFO MAYBE ?
  res.render("partials/help/" + name );
};

exports.getStoryPartial = function(req, res) {
  var page = req.params.pageid,
      section = req.params.sectionid;
  if(!page || !section) {
    res.json({ error: 'page or section was wrong' });
  }

  //ADD GAMEINFO MAYBE ?
  res.render("partials/story/p" + page + '_' + section, { gameInfo: gameInfo });
};
