const User = require("./user.model")

/**
 * This Async Function will returns all users if you are a dev but it will only return your user if you are a normal
 * user
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getByRole(req, res) {
    if(req.role == 'dev') {
        try{
            const users = await User.find()
            res.status(200).json(users)
        } catch (err){
            res.status(500).json({ message: err.mensaje })
        }
    } else if(req.role == 'user') {
        try{
            const user = await User.findOne({ email: req.email })
            res.status(200).json(user)
        } catch (err){
            res.status(500).json({ message: err.mensaje })
        }
    }
}

module.exports = {
    getByRole
}
