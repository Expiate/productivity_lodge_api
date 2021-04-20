const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../../server')
const User = require('./user.model')
const bcrypt = require('bcrypt')
const { response } = require('express')

const api = supertest(app)

const initialUser3UnhashedPassword = 'supermega15'
const initialUser4UnhashedPassword = 'supermega16'

const initialUsers = [
    {
        username: 'Expiate',
        email: 'tuetano32@gmail.com',
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
    },
    {
        username: 'Mr Ejemplo',
        email: 'ejemplo@gmail.com',
        password: bcrypt.hashSync(initialUser3UnhashedPassword, 10),
        confirmationCode: '3',
        status: 'Active'
    },
    {
        username: 'Jim',
        email: 'jim@gmail.com',
        password: bcrypt.hashSync(initialUser4UnhashedPassword, 10),
        confirmationCode: '4',
        status: 'Pending'
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
        email: 'tuetano32@gmail.com',
        password: 'supermega15',
    }
]

beforeEach(async () => {
    await User.deleteMany({})

    const user1 = new User(initialUsers[0])
    await user1.save()

    const user2 = new User(initialUsers[1])
    await user2.save()

    const user3 = new User(initialUsers[2])
    await user3.save()

    const user4 = new User(initialUsers[3])
    await user4.save()
})

describe('User generic tests', () => {
    test('you can return your user accesing in user mode with a valid jwt', async () => {
        const loginResponse = await api
            .post('/users/login')
            .send({
                email: initialUsers[2].email,
                password: initialUser3UnhashedPassword
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await api
            .get('/users')
            .set('Authorization', 'Bearer ' + loginResponse.body.accessToken)
            .expect(200)
        expect(response.body.email).toStrictEqual(initialUsers[2].email)
    })
    
    test('you can return all users in dev mode', async () => {
        const response = await api
            .get('/users')
            .set('Authorization', 'Dev ' + process.env.DEV_CODE1)
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

    test('passwords are being encrypted correctly', async () => {
        const response = await api
            .post('/users/signup')
            .send(usersToSignup[0])
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userFromDB = await User.findOne({ email: usersToSignup[0].email })

        expect(bcrypt.compareSync(usersToSignup[0].password, userFromDB.password)).toBe(true)
    })
})

describe('Login User tests', () => {
    test('login method generates and sents an jwt when email and password matches and the account is activated', async () => {
        const response = await api
            .post('/users/login')
            .send({
                email: initialUsers[2].email,
                password: initialUser3UnhashedPassword
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((res) => {
                if(!('accessToken' in res.body)) throw new Error("Missing Access Token")
            })
    })

    test('login method fails when email and password matches and the account is activated', async () => {
        const response = await api
            .post('/users/login')
            .send({
                email: initialUsers[3].email,
                password: initialUser4UnhashedPassword
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toStrictEqual({ "message": "This Account has not been activated yet" })
    })

    test('login method fails when email match but password does not match', async () => {
        const response = await api
            .post('/users/login')
            .send({
                email: initialUsers[3].email,
                password: 'WrongPassword'
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toStrictEqual({ "message": "Incorrect password for that email" })
    })

    test('login method fails when email does not match', async () => {
        const response = await api
            .post('/users/login')
            .send({
                email: 'WrongEmail',
                password: 'WrongPassword'
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toStrictEqual({ "message": "There is no Account using that email" })
    })
})


afterAll(() => {
    mongoose.connection.close()
    server.close()
})