const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    preferences: {
        colors: [String],
        topics: [String],
        hours_max: {
            type: Number,
            min: 0,
            max: 24,
            default: 16
        }
    }
})

module.exports = mongoose.model('User', userSchema)