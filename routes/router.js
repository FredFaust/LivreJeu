var express = require('express'),
    router = express.Router(),
    routes = require('../constants/routes'),
    game = require('../constants/game');

var homeController = require('./controllers/home'),
    helpController = require('./controllers/help'),
    fightController = require('./controllers/fight'),
    pagesController = require('./controllers/pages'),
    gameController = require('./controllers/game'),
    playerController = require('./controllers/player');

//Pages
router.route(routes.HOME)
    .get(homeController.getHome);

router.route(routes.HELP.MAIN)
    .get(helpController.getMain);

router.route(routes.HELP.TOPIC)
    .get(helpController.getTopic);

router.route(routes.FIGHT)
    .get(fightController.getFight);

router.route(routes.PAGES)
    .get(pagesController.getPage);

router.route(routes.CHOICE)
    .get(pagesController.getChoice);

router.route(routes.PLAYER)
    .post(playerController.postPlayer);


//JSON
router.route(routes.JSON.PLAYER)
    .get(playerController.getPlayerJSON);

router.route(routes.JSON.FIGHT)
    .get(fightController.getFightJSON);

router.route(routes.JSON.WEAPONS)
    .get(gameController.getWeaponsJSON);

module.exports = router;


