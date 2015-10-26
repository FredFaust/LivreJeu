var gameInfo = require('../../constants/game'),
    pages = require('../../constants/pages');

exports.getPage = function(req, res) {
  // Si le hero a deja ete cree precedemment, lorsqu'on selectionne 'Jeu' dans la barre de navigation,
  // on retourne a la page 1 plutot qu'a la page de creation puisque le hero est deja defini.
  var pageInfo = {
    title: 'Pages',
    heroname: req.session.hero ? req.session.hero.name : 'Felix le Vainqueur',
    pageNumber: req.params.pagenumber == 0
                  ? (req.session.hero ? 1 : 0)
                  : req.params.pagenumber,
    selectedNav: 'game',
    gameInfo: gameInfo,
    errorMessage: req.session.errorMessage
  };

  //On supprime le message d'erreur qui vient d'arriver de la session pour que la donnee ne soit pas
  //persistante.
  req.session.errorMessage = null;

  var pageToRender = 'pages/book/p'.concat(req.params.pagenumber, '_', req.params.section);

  res.render(pageToRender, pageInfo, function(err, html) {
    if (err) {
      //Si une erreur s'est produite, on affiche simplement que la page du livre n'a pas ete trouvee.
      console.error(err);
      res.render('pages/book/page_not_found');
    }
    else {
      // Dans le cas contraire, on termine la requete en envoyant le code HTML produit.
      res.end(html);
    }
  });
};

exports.getChoiceJSON = function(req, res) {
  var pageNumber = parseInt(req.params.pagenumber, 10);
  //On utilise la fonction makeChoice afin d'appeller la fonction de choix aléatoire pour une page spécifique
  //Celle-ci va prendre un chiffre au hasard, en fonction du contexte de la page, retournera le numéro de la page
  //qu'on doit maintenant visiter
  var resultPage = pages.makeChoice(pageNumber, req.session.hero);

  res.json(JSON.stringify({ redirect: '/game/' + resultPage }));
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
        console.error(err);
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

  res.json(JSON.stringify(pageJSON));
};