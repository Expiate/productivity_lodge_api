const Journal = require('./journal.model')

// Create Journal
async function createJournal(req, res) {
    let journal
    
    const date = req.body.date
    if (date == null) return res.status(400).json({ message: 'No date provided' })

    try {
        if (journal = await Journal.findOne({
            'userEmail': req.email,
            'date': new Date(date),
        }) != null) return res.status(400).json({ message: 'There is already a Journal with that date' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    journal = new Journal({
        userEmail: req.email,
        date: new Date(date),
        schedule : {
            work: req.body.schedule.work,
            leisure: req.body.schedule.leisure,
            sleep: req.body.schedule.sleep,
            personalDevelopment: req.body.schedule.personalDevelopment
        },
        productivityLevel: req.body.productivityLevel,
        sleepQuality: req.body.sleepQuality,
        workout: req.body.workout
    })

    try {
        await journal.save((err) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }

            res.status(201).json({ message: 'Journal created successfully'})
        })
    } catch (err) {
        return res.status(400).json({ message: err.message})
    }
}

async function updateJournal(req, res) {
    let journal
    
    const date = req.body.date
    if (date == null) return res.status(400).json({ message: 'No date provided' })

    try {
        journal = await Journal.findOne({
            'userEmail': req.email,
            'date': new Date(date),
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if(journal == null) return res.status(404).json({ message: 'Journal not found' })

    journal.userEmail = req.email
    journal.date = new Date(date)

    let schedule = {
        work: req.body.schedule.work,
        leisure: req.body.schedule.leisure,
        sleep: req.body.schedule.sleep,
        personalDevelopment: req.body.schedule.personalDevelopment
    }

    journal.schedule = schedule
    journal.productivityLevel = req.body.productivityLevel
    journal.sleepQuality = req.body.sleepQuality
    journal.workout = req.body.workout

    try {
        await journal.save((err) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }

            res.status(200).json({ message: 'Journal updated'})
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

// Get By Date
async function getByDate(req, res) {
    let journal
    let date = req.params.date

    try {
        journal = await Journal.findOne({
            userEmail: req.email,
            date: new Date(date),
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if (journal == null) return res.status(404).json({ message: 'Journal not found' })

    res.status(200).json(journal)
}

// Get By Month
async function getByMonth(req, res) {
    console.log('geting by month')
    let journals
    const year = req.params.year
    const month = req.params.month
    console.log(year + ' ' + month)

    try {
        journals = await Journal.find({
            userEmail: req.email,
            date: {
                $gte: new Date(`${year}/${month}/01`),
                $lt: new Date(year, month , 0).setHours(23),
            },
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if (journals.length == 0) return res.status(404).json({ message: 'Journals not found' })

    res.status(200).json(journals)
}

// Get By Year
async function getByYear(req, res) {
    let journals
    const year = req.params.year

    try {
        journals = await Journal.find({
            userEmail: req.email,
            date: {
                $gte: new Date(`${year}/01/01`),
                $lt: new Date(`${year}/12/31`).setHours(23),
            },
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if (journals.length == 0) return res.status(404).json({ message: 'Journals not found' })

    res.status(200).json(journals)
}

module.exports = {
    createJournal,
    updateJournal,
    getByDate,
    getByMonth,
    getByYear,
}