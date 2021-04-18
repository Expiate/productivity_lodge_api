/**
 * This Functions acts as a middleware and catches all the api calls that enters the server
 * and log it's content into de console
 * 
 * @param {*} app 
 */
module.exports.log = (app) => {
    app.use((req, res, next) => {
        console.log(`method: ${req.method}`)
        console.log(`path: ${req.path}`)
        console.log(`body: ${JSON.stringify(req.body)}`)
        next();
    })
}