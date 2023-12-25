import { checkMongoDB } from '../../src/services/mongo.js'
import chai from 'chai'

const expect = chai.expect

describe('MongoDB Service Check', () => {
  it('should return true when MongoDB is connected', async () => {
    // Mock a successful MongoDB connection
    // ...

    const result = await checkMongoDB({ /* config */ })
    expect(result).toBe(true)
  })

  it('should return false when MongoDB connection fails', async () => {
    // Mock a failed MongoDB connection
    // ...

    const result = await checkMongoDB({ /* config */ })
    expect(result).toBe(false)
  })
})
