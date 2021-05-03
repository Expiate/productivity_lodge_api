const Day = require('./day.model')

// Create Day
async function createDay(req, res) {
    let day
    try {
        // TODO Check if no body is provided provided correctly
        if (req.body.length == 0) return res.status(400).json({ message: 'No content provided' })
        if (day = await Day.findOne({
            'userEmail': req.email,
            'date': new Date(req.body.date), 
        }) != null) return res.status(400).json({ message: 'There is already a Day with that date' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    day = new Day({
        userEmail: req.email,
        date: req.body.date,
    })

    if(req.body.mood != null) {
        day.mood = req.body.mood
    }

    if(req.body.emotions != null) {
        day.emotions = req.body.emotions
    }

    if(req.body.note != null) {
        day.note = req.body.note
    }

    try {
        await day.save((err) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }

            res.status(201).json({ message: 'Day created successfully'})
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}
// Get Day by User / Date

// Get Days by User / Month / Year

// Update Day

// Delete Day

module.exports = {
    createDay,
}