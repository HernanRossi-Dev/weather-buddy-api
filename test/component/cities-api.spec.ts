jest.mock('../../src/utils/mongo-connection', () => ({
  getMongoConnection: jest.fn().mockImplementation(() => inMemoryDB())
}))
jest.mock('../../src/utils/logger', () => ({
  error: jest.fn().mockImplementation(() => { }),
  debug: jest.fn().mockImplementation(() => { })
}))
jest.mock('../../src/utils/helper-functions.ts', () => ({
  processUTCDate: jest.fn().mockImplementation(() => { return new Date }),
}))
import { inMemoryDB, clearDB, closeDB } from '../database-helper'
import faker from 'faker'
import request from "supertest"
import server from '../../src/server'
import { ICity } from '../../src/models/interfaces'

const createCityMock = () : ICity => {
  const newCity = {
    lat: parseFloat(faker.address.latitude()),
    lon: parseFloat(faker.address.longitude()),
    name: faker.address.city()
  }
  return newCity
}

describe('Cities-API', () => {

  beforeAll(async () => {
    jest.setTimeout(6000)
  })

  afterAll(async () => {
    await clearDB()
    await closeDB()
    server.close()
    jest.clearAllMocks()
    jest.resetModules()
  })

  describe('Get User endpoints', () => {

    describe('Get cities /api/cities/, ', () => {
      it('should respond status 200 when no cities not found', async () => {
        const res = await request(server).get(`/api/cities/`)
        expect(res.status).toEqual(200)
        expect(res.body.data).toEqual([])
      })
    })
  })

  describe('Post City /api/cities/ ', () => {
    it('should respond status 422 and error when no data sent', async () => {
      const res = await request(server).post(`/api/cities`)
        .send({})
      expect(res.status).toEqual(422)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toBe('Joi validation error: ValidationError: "name" is required')
    })


    it('should respond status 200 and return object', async () => {
      const city = createCityMock()
      const res = await request(server).post(`/api/cities`)
        .send({ ...city })
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('data')
      expect(res.body.status).toBe('Processed Successfully')
    })
  })

  describe('Delete City', () => {
    let cityName = ''
    beforeEach(async () => {
      const city = createCityMock()
      await request(server).post(`/api/cities`)
        .send({ ...city })
      cityName = city.name
    })

    describe('Delete City /api/cities/?name=, ', () => {
      it('should respond status 200 when parameters name is string', async () => {
        const name = [23423423]
        const res = await request(server).delete(`/api/cities/?name=${name}`)
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('message')
      })

      it('should respond status 200 when city not found', async () => {
        const res = await request(server).delete(`/api/cities/?name=${cityName}-ville`)
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('deletedCount')
        expect(res.body.data.deletedCount).toBe(0)
        expect(res.body.errors.length).toBeGreaterThan(0)
      })

      it('should delete city if found.', async () => {
        const res = await request(server).delete(`/api/cities/?name=${cityName}`)
        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('Processed Successfully')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('deletedCount')
        expect(res.body.data.deletedCount).toBe(1)
        expect(res.body.errors.length).toBe(0)
      })
    })
  })
})