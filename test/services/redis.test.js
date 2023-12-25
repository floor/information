import { checkRedis } from '../../src/services/redis.js'
import chai from 'chai'

const expect = chai.expect

describe('Redis Service Check', () => {
  it('should return true when Redis is connected', async () => {
    // Mock a successful Redis connection
    // ...

    const result = await checkRedis('localhost', 6379)
    expect(result).toBe(true)
  })

  it('should return false when Redis connection fails', async () => {
    // Mock a failed Redis connection
    // ...

    const result = await checkRedis('localhost', 6379)
    expect(result).toBe(false)
  })
})
