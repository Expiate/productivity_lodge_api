
module.exports.log = (app) => {
    app.use((req, res, next) => {
        console.log(`method: ${req.method}`)
        console.log(`path: ${req.path}`)
        console.log(`body: ${JSON.stringify(req.body)}`)
        next();
    })
}