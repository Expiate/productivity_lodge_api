const User = require("../user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * This Async Function tries to find a User in the DB that has the same Email/Password that the data provided in req param
 * and its status is Active, then proceeds to create a JWT Signed Token using the email and returns it in JSON
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns JSON
 */
module.exports.login = async(req, res) => {
    let user
    try {
        user = await User.findOne({ 'email': req.body.email })
        if (user == null) return res.status(400).json({ message: 'There is no Account using that email' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(400).json({ message: 'Incorrect password for that email' })

    if(user.status == User.schema.path('status').enumValues[0]) return res.status(400).json({ message: 'This Account has not been activated yet' })

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
    res.status(200).json({ accessToken: accessToken })
}