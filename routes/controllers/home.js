exports.getHome = function (_req, res) {
  res.render('pages/home', {
    title: 'Le Livre de Jeu du Maitre Kai',
    selectedNav: 'home'
  });
};
