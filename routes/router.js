var express = require('express'),
    router = express.Router(),
    routes = require('../constants/routes'),
    game = require('../constants/game');

var homeController = require('./controllers/home'),
    helpController = require('./controllers/help'),
    fightController = require('./controllers/fight'),
    gameController = require('./controllers/game'),
    weaponController = require('./controllers/weapon'),
    playerController = require('./controllers/player'),
    progressionController = require('./controllers/progression');

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

router.route(routes.PLAYERS)
    .post(playerController.postPlayer)
    .get(playerController.getPlayersJSON);

router.route(routes.SINGLE_PLAYER)
    .put(playerController.putPlayer)
    .get(playerController.getPlayerJSON)
    .delete(playerController.deletePlayer);

router.route(routes.PROGRESSIONS)
    .get(progressionController.getProgressions)
    .post(progressionController.postProgression);

router.route(routes.SINGLE_PROGRESSION)
    .get(progressionController.getProgression)
    .put(progressionController.putProgression)
    .delete(progressionController.deleteProgression);

//JSON
router.route(routes.JSON.CHOICE)
    .get(gameController.getChoiceJSON);

router.route(routes.JSON.SINGLE_PLAYER)
    .get(playerController.getPlayerJSON);

router.route(routes.JSON.PLAYERS)
    .get(playerController.getPlayersJSON);

router.route(routes.JSON.FIGHT)
    .get(fightController.getFightJSON);

router.route(routes.JSON.WEAPONS)
    .get(weaponController.getWeaponsJSON);

router.route(routes.JSON.PAGE)
    .get(gameController.getPageJSON);

module.exports = router;


