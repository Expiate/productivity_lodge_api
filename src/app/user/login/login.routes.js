const express = require('express')
const logController = require('./login.controller')

const router = express.Router()

// Login Route
router.route('/').post(logController.login)

module.exports = router
