const User = require("../user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("../../services/nodemailer.service")
const NODE_ENV = process.env.NODE_ENV

/**
 * This Async Function tries to find a User that has the same email as the one provided in the req param, then if it does not match with anyone
 * proceeds to create a new user holding the information provided in the req param to save it into the DB
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns JSON
 */
module.exports.signup = async(req, res) => {
    let user
    try {
        if (user = await User.findOne({ 'email': req.body.email }) != null) return res.status(400).json({ message: 'There is already an Account using that email' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    const token = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET)

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        confirmationCode: token
    })

    try {
        await user.save((err) => {
            if(err) {
                return res.status(500).json({ message: err.message })
            }

            res.status(201).json({ message: "User was registered successfully! Please check your email to activate your Account"})

            if(NODE_ENV !== 'test') {
                nodemailer.sendConfirmationEmail(
                    user.username,
                    user.email,
                    user.confirmationCode
                )
            }

        })
    } catch(err) {
        return res.status(400).json({ message: err.message })
    }
}

/**
 * This Asyn Function tries to verify if the ConfirmationCode provided in the req param matches with one
 * saved in the DB (User model) and then proceeds to change its status to Active 
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns JSON
 */
module.exports.verifyUser = async(req, res) => {
    let user
    try {
        user = await User.findOne({ 'confirmationCode': req.body.confirmationCode })
        if (user == null) return res.status(404).json({ message: 'This Account is not suitable for Activation'})
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    user.status = user.schema.path('status').enumValues[1]

    try{
        await user.save()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.status(200).json({ message: 'Account Activated'})
}

