const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    schedule: {
        work: {
            type: Number,
            required: true,
        },
        leisure: {
            type: Number,
            required: true
        },
        sleep: {
            type: Number,
            required: true,
        },
        personalDevelopment: {
            type: Number,
            required: true
        }
    },
    isProductive: {
        type: Boolean,
        required: true
    },
    goodSleep: {
        type: Boolean,
        required: true
    },
    workout: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Journal', journalSchema)
