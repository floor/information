import { checkHttpService } from '../../src/services/http.js'
import chai from 'chai'

const expect = chai.expect

describe('HTTP Service Check', () => {
  it('should return true for a successful HTTP call', async () => {
    // Mock a successful response
    // You need to mock the axios call used in checkHttpService
    // ...

    const result = await checkHttpService('http://example.com')
    expect(result).toBe(true)
  })

  it('should return false for a failed HTTP call', async () => {
    // Mock a failed response
    // ...

    const result = await checkHttpService('http://example.com')
    expect(result).toBe(false)
  })
})
