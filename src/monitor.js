import { CronJob } from 'cron'
import { checkHttp } from './services/http.js'
import { checkMongo } from './services/mongo.js'
import { checkRedis } from './services/redis.js'
import { alert } from './utils/alert.js'
import { config } from '../config/config.js'

const counters = {
  http: config.services.http.map(() => 0),
  mongodb: config.services.mongodb.map(() => 0),
  redis: 0 // Assuming only one Redis instance
}

async function monitorServices () {
  // HTTP Services
  await Promise.all(config.services.http.map(async (service, index) => {
    if (!await checkHttp(service.url)) {
      counters.http[index]++
      if (counters.http[index] >= service.alertThreshold) {
        await alert(`HTTP Service at ${service.url} is not responding!`, config)
        counters.http[index] = 0
      }
    } else {
      counters.http[index] = 0
    }
  }))

  // MongoDB Services
  await Promise.all(config.services.mongodb.map(async (service, index) => {
    if (!await checkMongo(service)) {
      counters.mongodb[index]++
      if (counters.mongodb[index] >= service.alertThreshold) {
        await alert(`MongoDB Service at ${service.uri} is not responding!`, config)
        counters.mongodb[index] = 0
      }
    } else {
      counters.mongodb[index] = 0
    }
  }))

  // Redis Service
  if (!await checkRedis(config)) {
    counters.redis++
    if (counters.redis >= config.services.redis.alertThreshold) {
      await alert('Redis Service is not responding!', config.email, config.twilio)
      counters.redis = 0
    }
  } else {
    counters.redis = 0
  }
}

console.log('Monitoring services...')
monitorServices()

const job = new CronJob(config.cron.time, () => {
  console.log('Monitoring services...')
  monitorServices()
}, () => {
  console.log('Every is fine!')
  monitorServices()
}, true)

job.start()
