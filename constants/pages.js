var random = require('../utilities/random');

exports.pagesNumbers = [0, 1, 12, 57, 62, 70, 78, 91, 129, 134, 155, 160, 167, 172, 180, 188, 204, 209, 245, 248, 288, 300, 318, 331, 339];

var info = [
  {
    id: 0,
    range: [1]
  }, {
    id: 1,
    range: [160, 273]
  }, {
    id: 12,
    range: [180, 259]
  }, {
    id: 57,
    range: [331]
  }, {
    id: 62,
    range: [288]
  }, {
    id: 70,
    range: [209, 339]
  }, {
    id: 78,
    range: [245],
    combatInfo: {
      enemyName: "BAKANAL",
      ability: 19,
      endurance: 30
    }
  }, {
    id: 91,
    range: [134]
  }, {
    id: 129,
    range: [155]
  }, {
    id: 134,
    range: [57, 188, 331],
    choice: function(player) {
      var result = random.getIntInclusive(0, 9);
      if (result >= 0 && result <= 3) {
        return this.range[0];
      }
      else if (result > 3 && result <= 6) {
        return this.range[1];
      }
      else {
        return this.range[2];
      }
    }
  }, {
    id: 155,
    range: [191, 248],
    choice: function(player) {
      var result = random.getIntInclusive(0, 9);

      if (player) {
        var endurance = player.endurance.actual;
        if (endurance < 10) {
          result -= 2;
        }
        else if (endurance > 20) {
          result++;
        }
      }

      if (result >= -2 && result <= 2) {
        return this.range[0];
      }
      else {
        return this.range[1];
      }
    }
  }, {
    id: 160,
    range: [78, 204, 318]
  }, {
    id: 167,
    range: [85, 300],
    choice: function(player) {
      var result = random.getIntInclusive(0, 9);
      if (result >= 0 && result <= 6) {
        return this.range[0];
      } else {
        return this.range[1];
      }
    }
  }, {
    id: 172,
    range: [134]
  }, {
    id: 180,
    range: [70, 129],
    combatInfo: {
      enemyName: "LANGUABARB",
      ability: 11,
      endurance: 35
    }
  }, {
    id: 188,
    range: [331]
  }, {
    id: 204,
    range: [134]
  }, {
    id: 209,
    range: [155]
  }, {
    id: 245,
    range: [91, 172]
  }, {
    id: 248,
    range: []
  }, {
    id: 288,
    range: [167]
  }, {
    id: 300,
    range: [12, 238]
  }, {
    id: 318,
    range: [134]
  }, {
    id: 331,
    range: [62, 288],
    choice: function(player) {
      var result = random.getIntInclusive(0, 9);
      if (result >= 0 && result <= 4)
        return this.range[0];
      else
        return this.range[1];
    }
  }, {
    id: 339,
    range: []
  }
];

exports.pagesInfo = info;

exports.makeChoice = function(pageNumber, player) {
  var result = _.first(_.where(info, {id: pageNumber}));
  if (result) {
    if (_.isFunction(result.choice)) {
      return result.choice(player);
    }
  }
  return pageNumber;
};