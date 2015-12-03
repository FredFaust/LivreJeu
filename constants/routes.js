module.exports = {
  INDEX: '/',
  CATCH_ALL: '*',
  API: {
    PLAYERS: '/players',
    PLAYER: '/players/:id',
    PROGRESSIONS: '/progressions',
    PROGRESSION: '/progressions/:playerid'
  },
  PARTIALS: {
    ANY: '/partials/:name',
    HELP: '/partials/help/:name',
    STORY: '/partials/story/:pageid/:sectionid',
    FIGHT: '/partials/fight/:pageid/:sectionid'
  }
};

/*{
 HOME: '/homeERASETHISONE',
 HELP: {
 MAIN: '/help',
 TOPIC: '/help/:topic'
 },
 FIGHT: '/fight',
 NEW_GAME: '/create',
 PAGES: '/game/:pagenumber/:section',
 PLAYERS: '/players',
 PARTIALS: '/partials/:filename',
 INDEX: '/home',
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
 };*/