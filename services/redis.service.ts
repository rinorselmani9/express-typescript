import { Repository, Schema } from 'redis-om'
import { createClient } from 'redis'

class Redis {
  private redisClient;
  constructor() {
    this.redisClient = createClient()
  }

  static async createIndex(schema: Schema) {
    const redis = new Redis()
    await redis.connect()
    const repo = await redis.fetchRepo(schema)
    repo.createIndex()
  }

  private async connect() {
    if (!this.redisClient.isOpen) {
      return await this.redisClient.connect()
    }
    return this.redisClient
  }

  public async fetchRepo(schema: Schema) {
    await this.connect()
    return new Repository(schema, this.redisClient)
  }
}

export default Redis