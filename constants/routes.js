var routes = {
  GET: {
    HOME: '/home',
    HELP: '/help',
    HELP_TOPIC: '/help/:topic',
    FIGHT: '/fight',
    PAGES: '/pages/:pagenumber'
  },
  POST: {
    CREATE_PLAYER: '/createPlayer'
  }
};

module.exports = routes;

Object.freeze(routes);