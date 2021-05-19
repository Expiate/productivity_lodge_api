const express = require('express')
const journalController = require('./journal.controller')

const router = express.Router()

router.route('/create').post(journalController.createJournal)
router.route('/update').patch(journalController.updateJournal)
router.route('/getJournal/:date').get(journalController.getByDate)
router.route('/getJournals/:year/:month').get(journalController.getByMonth)
router.route('/getJournals/:year').get(journalController.getByYear)

module.exports = router