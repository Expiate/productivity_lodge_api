const User = require("./user.model")

/**
 * This Async Function finds all the Users in the DB and returns them as JSON
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getAll = async(req, res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch (err){
        res.status(500).json({ message: err.mensaje })
    }
}
