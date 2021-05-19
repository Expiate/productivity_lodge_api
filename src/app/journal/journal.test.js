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
        "userEmail": "tuetano32@gmail.com",
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
        "userEmail": "tuetano32@gmail.com",
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
        "userEmail": "tuetano32@gmail.com",
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
        "userEmail": "tuetano32@gmail.com",
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

    const journal1 = new Journal(initialJournals[0])
    await journal1.save()

    const journal2 = new Journal(initialJournals[1])
    await journal2.save()

    const journal3 = new Journal(initialJournals[2])
    await journal3.save()

    const journal4 = new Journal(initialJournals[3])
    await journal4.save()
})

describe('create journal test', () => {
    test('you can create a journal using valid input', async() => {
        const response = await api
            .post('/journals/create')
            .set('Authorization', jwtToken)
            .send(journalsToCreate[0])
            .expect(201)
        expect(response.body).toStrictEqual({ 'message': 'Journal created successfully' })
    })

    test('you cannot create a journal without a date', async() => {
        const response = await api
            .post('/journals/create')
            .set('Authorization', jwtToken)
            .send(journalsToCreate[1])
            .expect(400)
        expect(response.body).toStrictEqual({ 'message': 'No date provided' })
    })

    test('you cannot create a journal without a valid schedule', async() => {
        const response = await api
            .post('/journals/create')
            .set('Authorization', jwtToken)
            .send(journalsToCreate[2])
            .expect(500)
    })

    test('you cannot create a journal without valid input', async() => {
        const response = await api
            .post('/journals/create')
            .set('Authorization', jwtToken)
            .send(journalsToCreate[3])
            .expect(500)
    })

    test('you cannot create a journal if the day is already being used', async() => {
        const response1 = await api
            .post('/journals/create')
            .set('Authorization', jwtToken)
            .send(journalsToCreate[0])
        
        const response2 = await api
            .post('/journals/create')
            .set('Authorization', jwtToken)
            .send(journalsToCreate[0])
            .expect(400)
        expect(response2.body).toStrictEqual({ 'message': 'There is already a Journal with that date' })
    })
})

describe('update journal test', () => {
    test('you can update a journal using valid input', async() => {
        initialJournals[0].schedule.leisure = 10

        const response = await api
            .patch('/journals/update')
            .set('Authorization', jwtToken)
            .send(initialJournals[0])
            .expect(200)
        expect(response.body).toStrictEqual({ 'message': 'Journal updated' })
    })

    test('you cannot update a journal without a date', async() => {
        initialJournals[0].date = null

        const response = await api
            .patch('/journals/update')
            .set('Authorization', jwtToken)
            .send(initialJournals[0])
            .expect(400)
        expect(response.body).toStrictEqual({ 'message': 'No date provided' })

        initialJournals[0].date = "2021-05-01"
    })

    test('you cannot update a journal if the date is not being used', async() => {
        initialJournals[0].date = "2021-11-12"

        const response = await api
            .patch('/journals/update')
            .set('Authorization', jwtToken)
            .send(initialJournals[0])
            .expect(404)
        expect(response.body).toStrictEqual({ 'message': 'Journal not found' })

        initialJournals[0].date = "2021-05-01"
    })
})

describe('get journal test', () => {
    test('you can get a journal using a valid date', async() => {
        const response = await api
            .get(`/journals/getJournal/${initialJournals[0].date}`)
            .set('Authorization', jwtToken)
            .expect(200)
    })

    test('you cannot get a journal if the date is not being used', async() => {
        const response = await api
            .get(`/journals/getJournal/4050-03-03`)
            .set('Authorization', jwtToken)
            .expect(404)
    })

    test('you can get all journals in a year using a valid year', async() => {
        const response = await api
            .get(`/journals/getJournals/2021`)
            .set('Authorization', jwtToken)
            .expect(200)
    })

    test('you cannot get all journals in a year if there are no journals in that year', async() => {
        const response = await api
            .get(`/journals/getJournals/4050`)
            .set('Authorization', jwtToken)
            .expect(404)
    })

    test('you can get all journals in a month using a valid month/year', async() => {
        const response = await api
            .get(`/journals/getJournals/2021/05`)
            .set('Authorization', jwtToken)
            .expect(200)
    })

    test('you cannot get all journals in a month if there are no journals in that month/year', async() => {
        const response = await api
            .get(`/journals/getJournals/4050/08`)
            .set('Authorization', jwtToken)
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})