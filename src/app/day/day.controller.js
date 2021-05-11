const Day = require('./day.model')

// Create Day
async function createDay(req, res) {
    let day

    const date = req.body.date
    if (date == null) return res.status(400).json({ message: 'No date provided' })

    try {
        if (day = await Day.findOne({
            'userEmail': req.email,
            'date': new Date(date),
        }) != null) return res.status(400).json({ message: 'There is already a Day with that date' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    day = new Day({
        userEmail: req.email,
        date: new Date(date),
    })

    if (req.body.mood != null) {
        day.mood = req.body.mood
    }

    if (req.body.emotions != null) {
        day.emotions = req.body.emotions
    }

    if (req.body.note != null) {
        day.note = req.body.note
    }

    try {
        await day.save((err) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }

            res.status(201).json({ message: 'Day created successfully' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

// Get Day by User / Date
async function getByDate(req, res) {
    let day
    const date = req.params.date
    if (date == null) return res.status(400).json({ message: 'No date provided' })

    try {
        day = await Day.findOne({
            userEmail: req.email,
            date: new Date(date),
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if (day == null) return res.status(404).json({ message: 'Day not found' })

    res.status(200).json(day)
}

// Get Days by User / Year
async function getByYear(req, res) {
    let days

    const year = req.params.year
    if (year == null) return res.status(400).json({ message: 'No year provided' })

    try {
        days = await Day.find({
            userEmail: req.email,
            date: {
                $gte: new Date(`${year}/01/01`),
                $lt: new Date(`${year}/12/31`).setHours(23),
            },
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if (days == null) return res.status(404).json({ message: 'Days not found' })

    res.status(200).json(days)
}

// Update Day
async function updateDay(req, res) {
    let day

    const date = req.params.date
    if (date == null) return res.status(400).json({ message: 'No date provided' })

    try {
        day = await Day.findOne({
            userEmail: req.email,
            date: new Date(date),
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    if (day == null) return res.status(404).json({ message: 'Day not found' })

    if (req.body.mood != null) {
        day.mood = req.body.mood
    }

    if (req.body.emotions != null) {
        day.emotions = req.body.emotions
    }

    if (req.body.note != null) {
        day.note = req.body.note
    }

    try {
        await day.updateOne((err) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }

            res.status(200).json({ message: 'Day updated' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}


// Delete Day
async function deleteDay(req, res) {
    let day

    const date = req.params.date
    if (date == null) return res.status(400).json({ message: 'No date provided' })

    try {
        day = await Day.findOne({
            userEmail: req.email,
            date: new Date(date),
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    if (day == null) return res.status(404).json({ message: 'Day not found' })

    try {
        await day.delete()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.status(200).json({ message: 'Day Deleted' })
}

module.exports = {
    createDay,
    getByDate,
    getByYear,
    updateDay,
    deleteDay,
}
