var gameInfo = require('../../constants/game'),
    pages = require('../../constants/pages');

exports.newGame = function(req, res) {
  res.render('pages/create', { gameInfo: gameInfo });
};

exports.getStory = function(req, res) {
  res.render('pages/story', { gameInfo: gameInfo });
};

exports.getStoryPage = function(req, res) {
  res.render('pages/sections/p' + req.params.pagenumber + '_' + req.params.section, { gameInfo: gameInfo });
};
