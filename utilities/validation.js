var pages = require('../constants/pages'),
    game = require('../constants/game');

module.exports = {
  validatePlayer: function(heroName, disciplines, req, res, callback) {
    if (!_.isString(heroName) || heroName.length === 0) {
      callback("Nom du hero invalide", req, res);
      return false;
    }

    return this.validateDisciplines(disciplines, req, res, callback);
  },
  validateDisciplines: function(disciplines, req, res, callback) {
    if (!disciplines || !_.isArray(disciplines)) {
      callback('Valeurs invalides', req, res);
      return false;
    }

    // It must be EXACTLY 5 disciplines
    if (disciplines.length != 5) {
      callback("Nombre incorrect de disciplines... Nb de Disciplines: " + disciplines.length, req, res);
      return false;
    }

    if (!_.every(disciplines, function(d) {
          return game.DISCIPLINES.hasOwnProperty(d);
        })) {
      callback("Disciplines invalides dans le formulaire", req, res);
      return false;
    }

    return true;
  },
  validateItems: function(items, req, res, callback) {
    if (!items || !_.isArray(items)) {
      callback('Valeurs invalides', req, res);
      return false;
    }

    // It must be EXACTLY 2 items
    if (items.length != 2) {
      callback("Nombre incorrect d'items... Nb items:" + items.length, req, res);
      return false;
    }

    if (!_.every(items, function(i) {
          return game.ITEMS.hasOwnProperty(i) || game.WORLD_ITEMS.hasOwnProperty(i);
        })) {
      callback("Equipement invalide dans la progression", req, res);
      return false;
    }
    return true;
  },
  validateProgression: function(progression, req, res, callback) {
    if (!_.contains(pages.pagesNumbers, progression.page)) {
      callback('Page invalide dans la progression', req, res);
      return false;
    }

    if (progression.endurance < 0) {
      callback('Endurance invalide dans la progression', req, res);
      return false;
    }

    if (progression.combatSkill < 0) {
      callback('Points d\'habilete invalide dans la progression', req, res);
      return false;
    }

    return this.validateItems(progression.items, req, res, callback);
  }
};