module.exports = {
  HOME: '/home',
  HELP: {
    MAIN: '/help',
    TOPIC: '/help/:topic'
  },
  FIGHT: '/fight',
  PAGES: '/game/:pagenumber/:section',
  CHOICE: '/choixaleatoire/:pagenumber',
  PLAYER: '/player',
  JSON: {
    FIGHT: '/json/combat/:player/:enemy',
    PAGE: '/json/page/:pagenumber',
    PLAYER: '/json/player',
    WEAPONS: '/json/weapons'
  }
};