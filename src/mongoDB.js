const mongoose = require('mongoose')

const { DATABASE_URI, DATABASE_URL_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? DATABASE_URL_TEST : DATABASE_URI

/**
 * This Function creates a connection to MongoDB
 */
module.exports.connectDatabase = () => {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
}
