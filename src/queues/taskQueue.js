const { Queue, QueueScheduler } = require('bullmq');
const { redisConnection } = require('../config/redis');

const taskQueue = new Queue('tasks', { connection: redisConnection });

module.exports = { taskQueue };

