var gameInfo = require('../../constants/game'),
    pages = require('../../constants/pages');

exports.getPage = function(req, res) {
  var pageInfo = {
    title: 'Pages',
    heroname: req.query.heroname || 'Felix le Vainqueur',
    pageNumber: req.params.pagenumber,
    selectedNav: 'game',
    gameInfo: gameInfo,
    errorMessage: req.session.errorMessage
  };

  req.session.errorMessage = null;

  //TODO: it would be nice to check in the file system to validate if page number and section are there
  //On vérifie si la page et la section à afficher sont valides
  if (_.contains(pages.pagesNumbers, parseInt(req.params.pagenumber, 10)) && _.contains([1, 2, 3], parseInt(req.params.section, 10))) {
    res.render('pages/book/p' + req.params.pagenumber + '_' + req.params.section, pageInfo);
  }
  else {
    res.render('pages/book/page_not_found');
  }
};

exports.getChoice = function(req, res) {
  var pageNumber = parseInt(req.params.pagenumber, 10);
  //On utilise la fonction makeChoice afin d'appeller la fonction de choix aléatoire pour une page spécifique
  //Celle-ci va prendre un chiffre au hasard, en fonction du contexte de la page, retournera le numéro de la page
  //qu'on doit maintenant visiter
  var resultPage = pages.makeChoice(pageNumber, req.session.hero);

  res.json('/game/' + resultPage);
};


exports.getPageJSON = function(req, res) {
  //Initialisation de l'objet
  var pageJSON = {
    id: req.params.pagenumber,
    html: {},
    range: []
  };

  var index = 1, stop = false;

  //Lecture du fichier filename et ajout de son html à l'objet pageJSON
  var readFile = function(filename, i) {
    res.render(filename, function(err, html) {
      if (err) {
        console.log(err);
        stop = true;
        return;
      }
      pageJSON.html['section' + i] = html;
    });
  };

  //Boucle qui permet de trouver tous les fichiers associé à un numéro de page
  while (!stop) {
    readFile('pages/book/p' + pageJSON.id + '_' + index, index);
    index++;
  }

  //On va chercher la page dans notre fichier de constantes de pages
  var page = _.findWhere(pages.pagesInfo, { id: parseInt(pageJSON.id, 10) });
  if (page) {
    //On ajoute les chemins possibles (autres pages) qu'on peut accéder à partir de celle-ci
    pageJSON.range = page.range;

    //Si cette page contient un combat, on ajoute ses infos à notre objet pageJSON
    if (page.combatInfo) {
      pageJSON.combatInfo = page.combatInfo;
    }
  }

  res.json(pageJSON);
};