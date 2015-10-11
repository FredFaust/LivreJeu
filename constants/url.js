module.exports = {
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
}

Object.freeze(this.GET);
Object.freeze(this.POST);