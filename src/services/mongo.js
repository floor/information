import { MongoClient } from 'mongodb'

export async function checkMongoDB (config) {
  try {
    const { uri, username, password, database } = config
    const fullUri = `mongodb://${username}:${password}@${uri}/${database}`
    const client = new MongoClient(fullUri, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect()
    await client.close()
    return true
  } catch (error) {
    return false
  }
}
