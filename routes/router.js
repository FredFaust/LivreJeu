var express = require('express'),
    router = express.Router(),
    url = require('../constants/url'),
    help = require('../constants/help'),
    game = require('../constants/game');

/* GET */

router.get(url.GET.HOME, function(req, res) {
    res.render('pages/home', { title: 'Le Livre de Jeu du Maitre Kai', selectedNav: 'home' });
});

router.get(url.GET.HELP, function (req, res) {
    res.render('pages/help', { title: 'Aide', selectedNav: 'help' });
});

router.get(url.GET.HELP_TOPIC, function (req, res) {
    var topic = req.params.topic;

    if (!help.TOPICS.hasOwnProperty(topic)) {
        res.render('pages/help/unknownTopic', { title: 'Aide', topic: topic, selectedNav: 'help' });
        return;
    }

    res.render('pages/help/' + topic, { title: 'Aide', topic: help.TOPICS[topic], selectedNav: 'help' });
});

router.get(url.GET.FIGHT, function(req, res) {
  res.render('pages/fight', { title: 'Combat', heroname: req.query.heroname || 'Felix le Vainqueur' , returnPage: req.query.return_page, name: req.query.name, ability: req.query.ability, endurance: req.query.endurance, selectedNav: 'game' });
});

router.get(url.GET.PAGES, function(req, res) {
    res.render('pages/book/p' + req.params.pagenumber, { title: 'Pages', heroname: req.query.heroname || 'Felix le Vainqueur', pageNumber: req.params.pagenumber, selectedNav: 'game' });
});

/* POST */

router.post(url.POST.CREATE_PLAYER, function(req, res) {
    var disciplines = req.body.disciplines;
    var items = req.body.items;

    console.log(disciplines.toString());
    console.log(items.toString());

    // TODO : Maybe refactor this, we need to indicate that the form was not valid on client side
    var renderInvalidPage = function(errorMessage){
        console.log(errorMessage);
        res.render('pages/book/p0', {selectedNav: 'game', invalidForm: true});
    };

    if (!disciplines || !items){
        renderInvalidPage('Items or disciplines is null or undefined...');
        return;
    }

    if (!Array.isArray(disciplines) || !Array.isArray(items)) {
        renderInvalidPage('Items or disciplines is not an array...');
        return;
    }

    // It must be EXACTLY 5 disciplines and 2 items
    if (disciplines.length != 5 || items.length != 2) {
        renderInvalidPage('Incorrect number of disciplines or items... Disciplines: ' + disciplines.length + ' Items: ' + items.length);
        return;
    }

    var validateArray = function (array, container, errorMessage) {
        var validElements = true;
        for (var i = 0; i < array.length; i++){
            var elem = array[i];
            console.log(elem);
            if (!container.hasOwnProperty(elem)){
                console.log(errorMessage + elem);
                validElements = false;
                break;
            }
        }
        return validElements;
    };

    console.log(validateArray.toString());

    /* Validate disciplines and items
     e.g. {
            "disciplines" :  [ "CAMOUFLAGE", "HUNT", "SIXTH_SENSE", "ORIENTATION", "HEALING" ],
            "items" : ["SWORD", "SABRE"]
          }
     -> VALID
          {
            "disciplines" :  [ "WHAT", "YOLO", "HUEHUE", "ORIENTATION", "HEALING" ],
            "items" : ["SWORD", "SABRUH"]
          }
     -> INVALID */
    if (!validateArray(disciplines, game.DISCIPLINES, "Invalid discipline was found! ")) {
        renderInvalidPage("Invalid disciplines were found in submitted form.");
        return;
    }

    if (!validateArray(items, game.ITEMS, "Invalid item was found! ")) {
        renderInvalidPage("Invalid items were found in submitted form.");
        return;
    }

    console.log("Everything's fine bruh!");

});

module.exports = router;


