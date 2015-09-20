var express = require('express'),
    router = express.Router(),
    url = require('../constants/url');

router.get(url.HOME, function(req, res) {
    res.render('pages/home', { title: 'Le Livre de Jeu du Maitre Kai' });
});

router.get(url.HELP, function (req, res) {
    res.render('pages/help', { title: 'Aide' });
});

router.get(url.HELP_TOPIC, function (req, res) {
    var knownTopics = {};
    knownTopics['disciplines'] = 'Disciplines Kai';
    knownTopics['equipment'] = 'Equipement';
    knownTopics['fights'] = 'Combats';
    
    var helpTopic = req.params.topic;

    if (knownTopics[helpTopic] === undefined) {
        res.render('pages/help/unknownTopic', { title: 'Aide', topic: helpTopic });
        return;
    }

    res.render('pages/help/' + req.params.topic, { title: 'Aide', topic: knownTopics[helpTopic] }); 
});

router.get(url.START, function(req, res) {
    res.render('pages/start', { title: 'Depart' });
});

router.get(url.FIGHT, function(req, res) {
  res.render('pages/fight', { title: 'Combat', returnPage: req.query.return_page, name: req.query.name, hability: req.query.hability, endurance: req.query.endurance });
});

router.get(url.PAGES, function(req, res) {
    res.render('pages/book/page' + req.params.pagenumber, { title: 'Pages', pageNumber: req.params.pagenumber });
});

router.get(url.PAGES_TODO, function(req, res) {
    res.render('pages/book/pageTODO', { title: 'Pages' });
});

module.exports = router;


