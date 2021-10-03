const { RedisPubSub } = require('graphql-redis-subscriptions')

const connection = {
/*  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,*/
  host: 'redis',
  port: 6379,
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000)
  }
}

const pubsub = new RedisPubSub({ connection })

module.exports = pubsub
