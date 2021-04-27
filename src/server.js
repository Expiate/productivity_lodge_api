require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

// MongoDB Connection
require('./mongoDB').connectDatabase()

// Set Connection Whitelist to false
app.use(cors())
// Set API to Accept JSON
app.use(express.json())

// Load all the Routes and Middleware
require('./app/common/middleware/middlewareLoader').loadMiddleware(app)
require('./routes').loadRoutes(app)

const server = app.listen(process.env.PORT, console.log('Server Started'))

module.exports = { app, server }
