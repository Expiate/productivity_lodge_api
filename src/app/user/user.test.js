const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../../server')
const User = require('./user.model')

const api = supertest(app)

const initialUsers = [
    {
        username: 'Expiate',
        email: 'Tuetano32@gmail.com',
        password: 'supermega14',
        confirmationCode: '1',
        status: 'Pending'
    },
    {
        username: 'Network',
        email: 'networkbet4@gmail.com',
        password: 'supermega15',
        confirmationCode: '2',
        status: 'Active'
    }
]

const usersToSignup = [
    {
        username: 'Jose Luis',
        email: 'joseludev@gmail.com',
        password: 'supermega14'
    },
    {
        username: 'Expiate',
        email: 'Tuetano32@gmail.com',
        password: 'supermega14',
    }
]

beforeEach(async () => {
    await User.deleteMany({})

    const user1 = new User(initialUsers[0])
    await user1.save()

    const user2 = new User(initialUsers[1])
    await user2.save()
})

describe('User generic tests', () => {
    test('users are returned as json', async () => {
        const response = await api
            .get('/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are as many users as specified', async () => {
        const response = await api.get('/users')
        expect(response.body).toHaveLength(initialUsers.length)
    })
})

describe('Verify User tests', () => {
    test('verify method works for status/pending user if the confirmationCode is not in use', async () => {
        const response = await api
            .post('/users/signup/confirm')
            .send({ confirmationCode: '1' })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toStrictEqual({"message": "Account Activated"})
    })
    
    test('verify method does not work for status/active user', async () => {
        const response = await api
            .post('/users/signup/confirm')
            .send({ confirmationCode: '2' })
            .expect(404)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toStrictEqual({ "message": 'This Account is not suitable for Activation'})
    })
    
    test('verify method does not work if the confirmationCode does not match with one in the database', async () => {
        const response = await api
            .post('/users/signup/confirm')
            .send({ confirmationCode: '45' })
            .expect(404)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toStrictEqual({ "message": 'This Account is not suitable for Activation'})
    })
})

describe('Signup User tests', () => {
    test('signup method works if your email does not match with one in the database', async () => {
        const response = await api
            .post('/users/signup')
            .send(usersToSignup[0])
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toStrictEqual({ "message": "User was registered successfully! Please check your email to activate your Account"})
    })

    test('signup method does not works if your email match with one in the database', async () => {
        const response = await api
            .post('/users/signup')
            .send(usersToSignup[1])
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toStrictEqual({ "message": "There is already an Account using that email"})
    })
})


afterAll(() => {
    mongoose.connection.close()
    server.close()
})