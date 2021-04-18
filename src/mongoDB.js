const mongoose = require('mongoose')

/**
 * This Function creates a connection to MongoDB
 */
module.exports.connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
}