const userRouter = require('./app/user/user.routes')

/**
 * This Function loads all existing Root Routes in the API
 *
 * @param {*} app
 */
module.exports.loadRoutes = (app) => {
    app.use('/users', userRouter)
}
