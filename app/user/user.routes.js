const express = require('express')
const signRouter = require('./signup/signup.routes')
const userController = require('./user.controller')
const router = express.Router()

// Nested Router to Signup
router.use('/signup', signRouter)

// Get All Users Route
router.route('/').get(userController.getAll)

module.exports = router
