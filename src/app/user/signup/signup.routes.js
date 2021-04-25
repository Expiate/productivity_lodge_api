const express = require('express')
const signController = require('./signup.controller')

const router = express.Router()

// Signup Route
router.route('/').post(signController.signup)
// Signup Confirmation Route
router.route('/confirm').post(signController.verifyUser)
router.route('/confirm/resend').post(signController.resendEmail)

module.exports = router
