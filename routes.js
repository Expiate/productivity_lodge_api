const userRouter = require('./app/user/user.routes')

module.exports.loadRoutes = (app) => {
    app.use('/users', userRouter)
}