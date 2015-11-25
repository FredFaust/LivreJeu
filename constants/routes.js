module.exports = {
  HOME: '/home',
  HELP: {
    MAIN: '/help',
    TOPIC: '/help/:topic'
  },
  FIGHT: '/fight',
  NEW_GAME: '/create',
  PAGES: '/game/:pagenumber/:section',
  PLAYERS: '/players',
  STORY: '/story',
  STORY_PAGE_SECTION: '/story/:pagenumber/:section',
  SINGLE_PLAYER: '/players/:id',
  PROGRESSIONS: '/progressions',
  SINGLE_PROGRESSION: '/progressions/:playerid',
  JSON: {
    CHOICE: '/json/choixaleatoire/:pagenumber',
    FIGHT: '/json/combat/:player/:enemy',
    PAGE: '/json/page/:pagenumber',
    PLAYERS: '/json/players',
    SINGLE_PLAYER: '/json/players/:id',
    WEAPONS: '/json/weapons'
  }
};