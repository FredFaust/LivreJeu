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

  //TODO: it would be nice to check in the file system to validate if page number and section are there
  if (_.contains(pages, parseInt(req.params.pagenumber, 10)) && _.contains([1,2,3], parseInt(req.params.section, 10))){
    res.render('pages/book/p' + req.params.pagenumber + '_' + req.params.section, pageInfo);
  }
  else{
    res.render('pages/book/page_not_found');
  }
};

exports.getChoice = function(req, res) {
  var page = parseInt(req.params.pagenumber, 10);
  var resultPage = choice.makeChoice(page, req.session.hero);
  var pageOptions = resultPage === 331 ? '#prompt' : '';

  res.redirect('/game/' + resultPage + pageOptions);
};
