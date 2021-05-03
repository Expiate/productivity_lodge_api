const express = require('express')
const dayController = require('./day.controller')

const router = express.Router()

router.route('/create').post(dayController.createDay)
router.route('/getDay').get(dayController.getByDate)
router.route('/getDays').get(dayController.getByYear)

module.exports = router