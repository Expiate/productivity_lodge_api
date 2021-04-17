const express = require('express')
const signController = require('./signup.controller')
const router = express.Router()

router.route('/').post(signController.signup)
router.route('/confirm/:confirmationCode').post(signController.verifyUser)

module.exports = router
