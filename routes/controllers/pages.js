var gameInfo = require('../../constants/game');

exports.getPage = function(req, res) {

  var pageInfo = {
    title: 'Pages',
    heroname: req.query.heroname || 'Felix le Vainqueur',
    pageNumber: req.params.pagenumber,
    selectedNav: 'game'
  };

  // Creation form - we send the game information to the client
  if (req.params.pagenumber === '0'){
    pageInfo.gameInfo = gameInfo;
  }

  res.render('pages/book/p' + req.params.pagenumber, pageInfo);
};
