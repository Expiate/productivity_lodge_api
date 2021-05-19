const express = require('express')
const dayController = require('./day.controller')

const router = express.Router()

router.route('/create').post(dayController.createDay)
router.route('/getDay/:date').get(dayController.getByDate)
router.route('/getDays/:year/:month').get(dayController.getByMonth)
router.route('/getDays/:year').get(dayController.getByYear)
router.route('/update/:date').patch(dayController.updateDay)
router.route('/delete/:date').delete(dayController.deleteDay)

module.exports = router
