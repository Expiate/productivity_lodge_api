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
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if (err) return res.sendStatus(403);

            req.userId = decoded.userId;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}