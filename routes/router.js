var express = require('express'),
    router = express.Router(),
    url = require('../constants/url');

router.get(url.HOME, function(req, res) {
    res.render('pages/home', { title: 'Le Livre de Jeu du Maitre Kai', selectedNav: 'home' });
});

router.get(url.HELP, function (req, res) {
    res.render('pages/help', { title: 'Aide', selectedNav: 'help' });
});

router.get(url.HELP_TOPIC, function (req, res) {
    var knownTopics = {};
    knownTopics['disciplines'] = 'Disciplines Kai';
    knownTopics['equipment'] = 'Equipement';
    knownTopics['fights'] = 'Combats';
    
    var helpTopic = req.params.topic;

    if (knownTopics[helpTopic] === undefined) {
        res.render('pages/help/unknownTopic', { title: 'Aide', topic: helpTopic, selectedNav: 'help' });
        return;
    }

    res.render('pages/help/' + req.params.topic, { title: 'Aide', topic: knownTopics[helpTopic], selectedNav: 'help' });
});

router.get(url.FIGHT, function(req, res) {
  res.render('pages/fight', { title: 'Combat', heroname: req.query.heroname || 'Felix le Vainqueur' , returnPage: req.query.return_page, name: req.query.name, ability: req.query.ability, endurance: req.query.endurance, selectedNav: 'game' });
});

router.get(url.PAGES, function(req, res) {
    res.render('pages/book/p' + req.params.pagenumber, { title: 'Pages', heroname: req.query.heroname || 'Felix le Vainqueur', pageNumber: req.params.pagenumber, selectedNav: 'game' });
});

module.exports = router;


