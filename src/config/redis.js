const IORedis = require('ioredis');
require('dotenv').config();

const redisConnection = new IORedis({
  maxRetriesPerRequest: null,
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

module.exports = { redisConnection };
