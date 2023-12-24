import { CronJob } from 'cron'
import { checkHttpService } from './services/http.js'
import { checkMongoDB } from './services/mongo.js'
import { checkRedis } from './services/redis.js'
import { sendAlert } from './utils/alert.js'
import { config } from '../config/config.js'

const counters = {
  http: config.services.http.map(() => 0),
  mongodb: config.services.mongodb.map(() => 0),
  redis: 0 // Assuming only one Redis instance
}

async function monitorServices () {
  // HTTP Services
  await Promise.all(config.services.http.map(async (service, index) => {
    if (!await checkHttpService(service.url)) {
      counters.http[index]++
      if (counters.http[index] >= service.alertThreshold) {
        await sendAlert(`HTTP Service at ${service.url} is down!`, config.email, config.twilio)
        counters.http[index] = 0
      }
    } else {
      counters.http[index] = 0
    }
  }))

  // MongoDB Services
  await Promise.all(config.services.mongodb.map(async (service, index) => {
    if (!await checkMongoDB(service)) {
      counters.mongodb[index]++
      if (counters.mongodb[index] >= service.alertThreshold) {
        await sendAlert(`MongoDB Service at ${service.uri} is down!`, config.email, config.twilio)
        counters.mongodb[index] = 0
      }
    } else {
      counters.mongodb[index] = 0
    }
  }))

  // Redis Service
  if (!await checkRedis(config.services.redis.host, config.services.redis.port)) {
    counters.redis++
    if (counters.redis >= config.services.redis.alertThreshold) {
      await sendAlert('Redis Service is down!', config.email, config.twilio)
      counters.redis = 0
    }
  } else {
    counters.redis = 0
  }
}

const job = new CronJob('*/3 * * * *', () => {
  console.log('removing expired subscriptions')
  monitorServices()
}, null, true)
job.start()
