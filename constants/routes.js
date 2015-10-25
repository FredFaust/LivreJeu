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
    PLAYER: '/json/player',
    WEAPONS: '/json/weapons'
  }
};