var gameInfo = require('../../constants/game'),
    choice = require('../../constants/choice'),
    pages = require('../../constants/pages');

exports.getPage = function(req, res) {
  var pageInfo = {
    title: 'Pages',
    heroname: req.query.heroname || 'Felix le Vainqueur',
    pageNumber: req.params.pagenumber,
    selectedNav: 'game',
    errorMessage: req.session.errorMessage
  };

  req.session.errorMessage = null;
  // Creation form - we send the game information to the client
  if (req.params.pagenumber === '0'){
    pageInfo.gameInfo = gameInfo;
  }

  if (_.contains(pages, parseInt(pageInfo.pageNumber, 10))){
    res.render('pages/book/p' + req.params.pagenumber, pageInfo);
  }
  else{
    res.render('pages/book/page_not_found');
  }
};

exports.getChoice = function(req, res) {
  var page = parseInt(req.params.pagenumber, 10);
  var resultPage = choice.makeChoice(page, req.session.hero);
  var pageOptions = resultPage === 331 ? '#prompt' : '';

  res.redirect('/pages/' + resultPage + pageOptions);
};
