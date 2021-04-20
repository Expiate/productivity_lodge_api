/**
 * This Function will filter which routes are not in the path param and will load the Function
 * provided in the middleware param as a middleware
 *
 * @param {*} middleware Function
 * @param {*} path String Array
 * @returns
 */
module.exports = (middleware, path) => function (req, res, next) {
    if (path.indexOf(req.path) > -1) {
        return next();
    }
    return middleware(req, res, next);
};
