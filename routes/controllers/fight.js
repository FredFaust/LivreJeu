exports.getFight = function(req, res) {
  res.render('pages/fight', {
    title: 'Combat',
    heroname: req.query.heroname || 'Felix le Vainqueur',
    returnPage: req.query.return_page,
    name: req.query.name,
    ability: req.query.ability, endurance: req.query.endurance, selectedNav: 'game'
  });
};
