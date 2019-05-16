var help = require('../../constants/help');

exports.getMain = function (_req, res) {
  res.render('pages/help', {
    title: 'Aide',
    selectedNav: 'help'
  });
};

exports.getTopic = function (req, res) {
  var topic = req.params.topic;

  if (!help.TOPICS.hasOwnProperty(topic.toUpperCase())) {
    res.render('pages/help/unknownTopic', {
      title: 'Aide',
      topic: topic,
      selectedNav: 'help'
    });
    return;
  }

  res.render('pages/help/' + topic, {
    title: 'Aide',
    topic: help.TOPICS[topic],
    selectedNav: 'help'
  });
};
