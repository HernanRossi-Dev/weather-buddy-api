import app from '../../src/app'
jest.mock('../../src/utils/mongo-connection', () => ({
  getMongoConnection: jest.fn().mockImplementation(() =>  {})
}))

describe('App', () => {
  it('Should export app.', () => {
    expect(app).toBeDefined();
  })
})