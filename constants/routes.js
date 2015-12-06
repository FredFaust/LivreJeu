module.exports = {
  INDEX: '/',
  CATCH_ALL: '*',
  API: {
    PLAYERS: '/api/players',
    PLAYER: '/api/players/:id',
    PROGRESSIONS: '/api/progressions',
    PROGRESSION: '/api/progressions/:playerid',
    GAMEINFO : {
      ALL: '/api/gameinfo/all',
      MASTER_WEAPONS: '/api/gameinfo/master'
    }
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
 SINGLE_PLAYER: '/api/players/:id',
 PROGRESSIONS: '/api/progressions',
 SINGLE_PROGRESSION: '/api/progressions/:playerid',
 JSON: {
 CHOICE: '/json/choixaleatoire/:pagenumber',
 FIGHT: '/json/combat/:player/:enemy',
 PAGE: '/json/page/:pagenumber',
 PLAYERS: '/json/players',
 SINGLE_PLAYER: '/json/api/players/:id',
 WEAPONS: '/json/weapons'
 }
 };*/