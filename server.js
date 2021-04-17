const { config } = require("dotenv/types");

config()

const express = require('express')
const app = express()

// MongoDB Connection
require('./mongoDB').connectDatabase()

const jwt = require('jsonwebtoken')

// Set API to Accept JSON 
app.use(express.json)

app.listen(process.env.PORT, console.log('Server Started'))