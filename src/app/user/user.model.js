const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending',
    },
    confirmationCode: {
        type: String,
        unique: true,
    },
    registerDate: {
        type: Date,
        default: Date.now,
    },
    preferences: {
        colors: {
            type: [String],
            default: [
                '#7e57c2',
                '#5c6bc0',
                '#00bcd4',
                '#9ccc65',
                '#4caf50',
            ]
        },
    },
})

module.exports = mongoose.model('User', userSchema)
