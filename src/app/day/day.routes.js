const express = require('express')
const dayController = require('./day.controller')

const router = express.Router()

router.route('/create').post(dayController.createDay)
router.route('/getDay/:date').get(dayController.getByDate)
router.route('/getDays/:year').get(dayController.getByYear)

module.exports = router
