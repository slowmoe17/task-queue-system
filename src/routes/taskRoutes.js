const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', taskController.getMetrics);

router.post('/tasks', taskController.addTask);


router.get('/dlq', taskController.viewDLQ);

router.delete('/dlq', taskController.clearDLQ);

module.exports = router;
