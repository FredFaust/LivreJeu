module.exports = {
  // Returns a random number between 0 (inclusive) and 1 (exclusive)
  get: function() {
    return Math.random();
  },

  // Returns a random number between min (inclusive) and max (exclusive)
  getArbitrary: function (min, max) {
    return Math.random() * (max - min) + min;
  },

  // Returns a random integer between min (included) and max (excluded)
  // Using Math.round() will give you a non-uniform distribution!
  getInt : function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  // Returns a random integer between min (included) and max (included)
  // Using Math.round() will give you a non-uniform distribution!
  getIntInclusive : function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};