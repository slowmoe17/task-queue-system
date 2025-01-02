const { taskQueue } = require('../queues/taskQueue.js')


exports.addTask = async (req, res) => {
  const { type, payload, visibility_time } = req.body;
  try {
    const job = await taskQueue.add(type, payload, {
      delay: visibility_time ? new Date(visibility_time) - Date.now() : 0,
    });
    res.status(201).json({ id: job.id, status: 'Task added to queue' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
};


exports.viewDLQ = async (req, res) => {
  try {
    const failedJobs = await taskQueue.getFailed();
    res.json(
      failedJobs.map(job => ({
        id: job.id,
        type: job.name,
        payload: job.data,
        error: job.failedReason,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch DLQ tasks' });
  }
};


exports.clearDLQ = async (req, res) => {
  try {
    const failedJobs = await taskQueue.getFailed();
    await Promise.all(failedJobs.map(job => job.remove()));
    res.json({ status: 'DLQ cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear DLQ' });
  }
};

exports.getMetrics = async (req, res) => {
    try {
      const completedJobsCount = await taskQueue.getCompletedCount();
      const queueSize = await taskQueue.getWaitingCount();
      const retryCount = await taskQueue.getDelayedCount();
      const failedJobsCount = await taskQueue.getFailedCount();
  
      res.status(200).json({
        status: "success",
        message : 'Metrics fetched successfully',
        data: {
                totalTasksProcessed: completedJobsCount,
                currentQueueSize: queueSize,
                retries: retryCount,
                dlqSize: failedJobsCount,
        }
      });
     
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch metrics' });
    }
  };