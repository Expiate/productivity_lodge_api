const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../../server')

const api = supertest(app)

test('users are returned as json', async () => {
    console.log('test start')
    const call = await api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})