const jwt = require('jsonwebtoken')

/**
 * This Function acts a a Middleware to check that a certain request haves a jwt token in its authorization header
 * and then tries to verify that the token is valid, if its valid it passes its contents to the next Function
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
        if (err) return res.sendStatus(403)

        req.userId = id
        next()
    })
}