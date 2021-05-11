const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../../server')
const Day = require('./day.model')

const api = supertest(app)
/*
    Tests depend on this initial data to check the API endpoints,
    if you are willing to change a test you should check what
    initial data it uses to work
*/

const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1ZXRhbm8zMkBnbWFpbC5jb20iLCJpYXQiOjE2MTg5MzIwNzJ9.5IQY548NLdu_o4bkItC8lhETXO6kqNYb4z3wckJmFyg'

const initialDays = [
    {
        "userEmail": "tuetano32@gmail.com",
        "date": "2021-06-18",
        "mood": "3",
        "emotions": [
            "relax",
            "love",
            "optimistic",
            "motivated",
            "sick"
        ],
        "note": "I went to my old college to take some photos of the patio statue to keep working in my project. And I had to cook for my family for dinner"
    },
    {
        "userEmail": "tuetano32@gmail.com",
        "date": "2021-07-28",
        "emotions": [
            "relax",
        ]
    }
]

const daysToCreate = [
    {
        "date": "2021-09-20",
        "mood": "3",
        "note": "Nothing here"
    },
    {
        "mood": "3",
        "note": "Nothing here"
    },
    {
        "date": "2021-06-18",
        "mood": "3",
        "note": "Nothing here"
    },
]

beforeEach(async () => {
    await Day.deleteMany({})

    const day1 = new Day(initialDays[0])
    await day1.save()

    const day2 = new Day(initialDays[1])
    await day2.save()
})

describe('create day tests', () => {
    test('you can create a day with valid input', async() => {

        const response = await api
        .post('/days/create')
        .set('Authorization', jwtToken)
        .send(daysToCreate[0])
        .expect(201)
        expect(response.body).toStrictEqual({ 'message': 'Day created successfully' })
    })

    test('you cannot create a day without a jwt token', async() => {

        const response = await api
        .post('/days/create')
        .send(daysToCreate[0])
        .expect(401)
    })

    test('you cannot create a day without a date', async() => {

        const response = await api
        .post('/days/create')
        .set('Authorization', jwtToken)
        .send(daysToCreate[1])
        .expect(400)
        expect(response.body).toStrictEqual({ 'message': 'No date provided' })
    })

    test('you cannot create a if there is one with the same date', async() => {

        const response = await api
        .post('/days/create')
        .set('Authorization', jwtToken)
        .send(daysToCreate[2])
        .expect(400)
        expect(response.body).toStrictEqual({ 'message': 'There is already a Day with that date' })
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})