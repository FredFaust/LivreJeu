var rand = require('../utilities/random');

var numbers = [
  {
    id: 167,
    range: [85, 300],
    rand: function(progression) {
      var result = rand.getIntInclusive(0, 9);
      if (result >= 0 && result <= 6) {
        return this.range[0];
      } else {
        return this.range[1];
      }
    }
  },
  {
    id: 134,
    range: [57, 188, 331],
    rand: function(progression) {
      var result = rand.getIntInclusive(0, 9);
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
  },
  {
    id: 155,
    range: [248, 191],
    rand: function(progression){
      var result = rand.getIntInclusive(0, 9);

      if (progression){
        var endurance = progression.endurance;
        if (endurance < 10){
          result -= 2;
        }
        else if (endurance > 20) {
          result++;
        }
      }

      if (result >= -2 && result <= 2){
        return this.range[0];
      }
      else
      {
        return this.range[1];
      }
    }
  },
  {
    id: 331,
    range: [62, 288],
    rand: function(progression) {
      var result = rand.getIntInclusive(0, 9);
      if (result >= 0 && result <= 4)
        return this.range[0];
      else
        return this.range[1];
    }
  }
];

exports.makeChoice = function(pageNumber, progression) {
  var result = _.first(_.where(numbers, { id: pageNumber }));
  if (result) {
    return result.rand(progression);
  } else {
    return pageNumber;
  }
};