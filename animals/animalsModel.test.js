const Animals = require('./animalsModel');
const server = require('../api/server')
const db = require('../data/dbConfig');
const request= require('supertest')

describe('animals model', function() {

    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('insert()', function() {
        beforeEach(async () => {
            await db('animals').truncate();
        })

        it('adds the new animal to the db', async function() {
            await Animals.insert({species: "snake", name: "sarah"})

            const animals = await db('animals')

            expect(animals).toHaveLength(1)
        })

        it('should return status code of 201', function() {
            return request(server)
            .post('/')
            .send({
                species: "snake",
                name: "sara"
            })
            .then(response => {
                expect(response.status).toBe(201)
            })
        })
    })

   describe('delete()', function() {
        it('should delete animal', function() {
            return request(server)
            .delete('/1')
            .then((response) => {
                expect(response.status).toBe(200)
            })
        })

        it('should return a JSON', function() {
            return request(server)
            .delete('/1')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
        })
   })

   describe('Get animals', function() {
    it('should get a list of animals', function() {
        return request(server)
        .get('/animals')
        .then((response) => {
            expect(response.status).toBe(200)
        })
    })

    it('should return a JSON', function() {
        return request(server)
        .get('/animals')
        .then(res => {
            expect(res.type).toMatch(/json/i)
        })
    })
})

})