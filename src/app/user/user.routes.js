const express = require('express')
const signRouter = require('./signup/signup.routes')
const logRouter = require('./login/login.routes')
const userController = require('./user.controller')
const router = express.Router()

// Nested Router to Signup
router.use('/signup', signRouter)

// Nested Router to Login
router.use('/login', logRouter)

// Get All Users Route
router.route('/').get(userController.getByRole)

module.exports = router
