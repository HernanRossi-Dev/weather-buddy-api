import { inMemoryDB, clearDB, closeDB } from '../database-helper'
import axios from 'axios'

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

import faker from 'faker'
import request from "supertest"
import server from '../../src/server'
import { ICity } from '../../src/models/interfaces'

const createCityMock = () => {
  const newCity: ICity = {
    lat: parseFloat(faker.address.latitude()),
    lon: parseFloat(faker.address.longitude()),
    name: faker.address.city()
  }
  return newCity
}
let axiosMock: jest.SpyInstance

describe.only('Weather-API', () => {
  beforeAll(async () => {
    axiosMock = jest.spyOn(axios, 'get');
    jest.setTimeout(6000)
  })

  afterAll(async () => {
    await clearDB()
    await closeDB()
    server.close()
    axiosMock.mockRestore()
    jest.clearAllMocks()
    jest.resetModules()
  })

  describe.only('Get User endpoints', () => {

    describe('Get weather /api/cities/, ', () => {
      it('should respond status 200 when no cities found', async () => {
        axiosMock.mockResolvedValue({ data: { current: 'Current', daily: 'Daily' } })
        const res = await request(server).get(`/api/weather/`)
        expect(res.status).toEqual(200)
        expect(res.body.data).toEqual([])
      })

      it('should respond status 200 when cities found', async () => {
        const city = createCityMock()
        const resPost = await request(server).post(`/api/cities`)
          .send({ ...city })
        expect(resPost.status).toEqual(200)
        axiosMock.mockResolvedValue({ data: { current: 'Current', daily: 'Daily' } })
        const res = await request(server).get(`/api/weather/`)
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.status).toBe('Processed Successfully')
      })
    })
  })
})