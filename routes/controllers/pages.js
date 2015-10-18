exports.getPage = function(req, res) {
  res.render('pages/book/p' + req.params.pagenumber, {
    title: 'Pages',
    heroname: req.query.heroname || 'Felix le Vainqueur',
    pageNumber: req.params.pagenumber,
    selectedNav: 'game'
  });
};
