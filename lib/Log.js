var log = require('../config.js').log

module.exports = {
    http: text => {
        if (!log.http) return
        console.log((new Date).toISOString() + ' http: ' + text)
    },
    info: text => {
        if (!log.info) return
        console.log((new Date).toISOString() + ' info: ' + text)
    },
}
