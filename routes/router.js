var express = require('express'),
    router = express.Router(),
    routes = require('../constants/routes'),
    game = require('../constants/game');

var homeController = require('./controllers/home'),
    helpController = require('./controllers/help'),
    fightController = require('./controllers/fight'),
    gameController = require('./controllers/game'),
    weaponController = require('./controllers/weapon'),
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
    .get(gameController.getPage);

router.route(routes.PLAYER)
    .post(playerController.postPlayer);

//JSON
router.route(routes.JSON.CHOICE)
    .get(gameController.getChoiceJSON);

router.route(routes.JSON.PLAYER)
    .get(playerController.getPlayerJSON);

router.route(routes.JSON.FIGHT)
    .get(fightController.getFightJSON);

router.route(routes.JSON.WEAPONS)
    .get(weaponController.getWeaponsJSON);

router.route(routes.JSON.PAGE)
    .get(gameController.getPageJSON);

module.exports = router;


