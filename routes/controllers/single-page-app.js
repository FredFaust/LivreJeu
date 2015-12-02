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

  res.render("partials/" + name, { gameInfo: gameInfo });
};

exports.getFightPartial = function(req, res) {
  //TODO: verify returnPage and returnSection

  //TODO : make a call to retreive the info for this fight or maybe use gameInfo ??

  res.render("partials/fight", {
    gameInfo: gameInfo,
    heroname: 'Felix le Vainqueur',
    returnPage: req.params.pageid, //req.query.return_page,
    returnSection: 1 + parseInt(req.params.sectionid), //req.query.return_section,
    name: 'Languabarbu', //req.query.name,
    ability: req.query.ability,
    endurance: req.query.endurance
  });
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
  res.render("partials/story/p" + page + '_' + section, { gameInfo: gameInfo, pageNumber: page, sectionNumber: section });
};
