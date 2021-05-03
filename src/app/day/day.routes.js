const express = require('express')
const dayController = require('./day.controller')

const router = express.Router()

router.route('/create').post(dayController.createDay)

module.exports = router