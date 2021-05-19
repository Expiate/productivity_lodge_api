const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../../server')
const Journal = require('./journal.model')

const api = supertest(app)
/*
    Tests depend on this initial data to check the API endpoints,
    if you are willing to change a test you should check what
    initial data it uses to work
*/

const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1ZXRhbm8zMkBnbWFpbC5jb20iLCJpYXQiOjE2MTg5MzIwNzJ9.5IQY548NLdu_o4bkItC8lhETXO6kqNYb4z3wckJmFyg'

const initialJournals = [
    {
        "date": "2021-05-01",
        "schedule": {
            "work": 7,
            "leisure": 4,
            "sleep": 8,
            "personalDevelopment": 2
        },
        "productivityLevel": 6,
        "sleepQuality": 8,
        "workout": true
    },
    {
        "date": "2021-05-03",
        "schedule": {
            "work": 1,
            "leisure": 1,
            "sleep": 1,
            "personalDevelopment": 1
        },
        "productivityLevel": 6,
        "sleepQuality": 8,
        "workout": false
    },
    {
        "date": "2021-05-31",
        "schedule": {
            "work": 3,
            "leisure": 3,
            "sleep": 3,
            "personalDevelopment": 3
        },
        "productivityLevel": 6,
        "sleepQuality": 8,
        "workout": true
    },
    {
        "date": "2021-06-01",
        "schedule": {
            "work": 9,
            "leisure": 0,
            "sleep": 0,
            "personalDevelopment": 0
        },
        "productivityLevel": 6,
        "sleepQuality": 8,
        "workout": true
    }
]

const journalsToCreate = [
    {
        "date": "2021-08-01",
        "schedule": {
            "work": 7,
            "leisure": 4,
            "sleep": 8,
            "personalDevelopment": 2
        },
        "productivityLevel": 6,
        "sleepQuality": 8,
        "workout": true
    },
    {
        "schedule": {
            "work": 7,
            "leisure": 4,
            "sleep": 8,
            "personalDevelopment": 2
        },
        "productivityLevel": 6,
        "sleepQuality": 8,
        "workout": true
    },
    {
        "date": "2022-07-01",
        "schedule": {
            "leisure": 4,
            "sleep": 8,
            "personalDevelopment": 2
        },
        "productivityLevel": 6,
        "sleepQuality": 8,
        "workout": true
    },
    {
        "date": "2023-03-01",
        "schedule": {
            "work": 7,
            "leisure": 4,
            "sleep": 8,
            "personalDevelopment": 2
        },
        "sleepQuality": 8,
        "workout": true
    }
]

beforeEach(async () => {
    await Journal.deleteMany({})

    const journal1 = new Day(initialJournals[0])
    await journal1.save()

    const journal2 = new Day(initialJournals[1])
    await journal2.save()

    const journal3 = new Day(initialJournals[2])
    await journal3.save()

    const journal4 = new Day(initialJournals[3])
    await journal4.save()
})

describe('create journal test', () => {

})

describe('update journal test', () => {
    
})

describe('get journal test', () => {
    
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})