const { Worker } = require('bullmq');
const { redisConnection } = require('../config/redis');

const taskWorker = new Worker(
  'tasks',
  async job => {
    console.log(`Processing task ${job.id} of type ${job.name}`);
    // Simulate task processing
    if (Math.random() < 0.3) {
      throw new Error('Simulated processing error');
    }
    console.log(`Task ${job.id} processed successfully and Logic simulation should be completed like if i need to send email for Hoarsecords users`);
  },
  {
    connection: redisConnection,
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  }
);

// Log failed tasks
taskWorker.on('failed', job => {
  console.error(`Task ${job.id} failed after ${job.attemptsMade} attempts`);
});

module.exports = { taskWorker };
