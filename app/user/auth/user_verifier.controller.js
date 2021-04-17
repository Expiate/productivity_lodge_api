const { config } = require("dotenv/types");

config()

const User = require("../user.model")

/**
 * This Asyn Function tries to verify if the ConfirmationCode provided in the req param matches with one
 * saved in the DB (User model) and then proceeds to change its status to Active 
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns JSON
 */
exports.verifyUser = async(req, res) => {
    let user
    try {
        user = await User.findOne({ 'confirmationCode': req.params.confirmationCode })
        if (user == null) return res.status(404).json({ message: 'This Account is not suitable for Activation'})
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    // TODO Subject to FAIL
    user.status = user.schema.path('status').enumValues[1]

    try{
        await user.save()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.status(200).json({ message: 'Account Activated'})
}