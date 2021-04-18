require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()


// MongoDB Connection
require('./mongoDB').connectDatabase()

// Set API to Accept JSON 
app.use(express.json())

// Load all the Routes and Middleware
require('./app/middleware/middlewareLoader').loadMiddleware(app)
require('./routes').loadRoutes(app)
// Set Connection Whitelist to false
app.use(cors())

const server = app.listen(process.env.PORT, console.log('Server Started'))

module.exports = { app, server }