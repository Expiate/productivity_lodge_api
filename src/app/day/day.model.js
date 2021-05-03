const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({
    userEmail : {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    mood: {
        type: Number,
    },
    note: {
        type: String,
    },
    emotions: {
        type: [String],
    }
})

module.exports = mongoose.model('Day', daySchema)