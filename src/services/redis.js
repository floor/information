import redis from 'redis'

export async function checkRedis (host, port) {
  return new Promise((resolve) => {
    const client = redis.createClient({ host, port })
    client.on('connect', () => {
      client.quit()
      resolve(true)
    })
    client.on('error', () => {
      client.quit()
      resolve(false)
    })
  })
}
