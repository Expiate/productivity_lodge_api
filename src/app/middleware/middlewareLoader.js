const logger = require('./log.middleware')
const auth = require('./auth.middleware')
const blacklist = require('./blacklist/blacklist.middleware')
const blacklistedRoutes = require('./blacklist/blacklist')

/**
 * This Function acts as the central middleware application loader, so it manages which middleware will be active
 * 
 * @param {*} app 
 */
module.exports.loadMiddleware = (app) => {
    logger.log(app)
    app.use(blacklist(auth, blacklistedRoutes))
}