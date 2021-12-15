const redis = require('redis')

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
}).on('error', (err) => console.error('ERR:REDIS:', err))

module.exports = redisClient