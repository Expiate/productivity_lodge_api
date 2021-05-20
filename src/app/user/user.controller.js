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
            let userData = {
                username: user.username,
                email: user.email,
                preferences: user.preferences,
                registerDate: user.registerDate
            }
            res.status(200).json(userData)
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

async function changeColors(req, res) {
    let user
    try {
        user = await User.findOne({ email: req.email })
        if (user == null) return res.status(404).json({ message: 'User not found' })
    } catch (err) {
        res.status(500).json({ message: err.mensaje })
    }

    user.preferences.colors = req.body.colors

    try {
        await user.save((err) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }

            res.status(200).json({ message: 'User updated'})
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getByRole,
    deleteUser,
    changeColors,
}
