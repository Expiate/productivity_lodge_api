const User = require('./user.model')

/**
 * This Async Function will returns all users if you are a dev but
 * it will only return your user if you are a normal user
 *
 * @param {*} req
 * @param {*} res
 */
async function getByRole(req, res) {
    if (req.role == 'dev') {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({ message: err.mensaje })
        }
    } else if (req.role == 'user') {
        try {
            const user = await User.findOne({ email: req.email })
            if (user == null) return res.status(404).json({ message: 'User not found' })
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({ message: err.mensaje })
        }
    }
}
/**
 * This Async Function gets the email from the decoded JWT and
 * uses it to delete its User
 * @param {*} req
 * @param {*} res
 * @returns Response
 */
async function deleteUser(req, res) {
    const userToDelete = await User.findOneAndDelete({ email: req.email })

    // This case will never happend
    if (userToDelete == null) return res.status(404).json({ message: 'User not found' })

    res.status(200).json({ message: 'User deleted' })
}
// TODO Write logic to ChangePassword
async function changePassword(req, res) {
    console.log()
}

module.exports = {
    getByRole,
    deleteUser,
}
