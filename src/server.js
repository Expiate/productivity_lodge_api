require('dotenv').config()

const express = require('express')
const app = express()

// MongoDB Connection
require('./mongoDB').connectDatabase()

// Set API to Accept JSON 
app.use(express.json())

// Load all the Routes and Middleware
require('./app/middleware/log.middleware').log(app)
require('./routes').loadRoutes(app)

const server = app.listen(process.env.PORT, console.log('Server Started'))

module.exports = { app, server }