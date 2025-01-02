# Task Queue System with BullMQ

A highly scalable and efficient Task Queue system built with BullMQ, leveraging Redis as a backend for managing and processing background tasks. This system offers capabilities like task retries, delayed tasks, and a Dead-Letter Queue (DLQ) for tasks that fail after multiple retries.

## Features

- **Asynchronous Task Processing:** Handle heavy tasks in the background without blocking the main application flow.
- **Retry Logic with Exponential Backoff:** Automatically retry failed tasks with an increasing delay.
- **Dead-Letter Queue (DLQ):** Track and manage failed tasks that couldn't be processed after multiple retries.
- **Delayed Tasks:** Schedule tasks to be processed at a later time.
- **API for Task Management:** Add tasks to the queue, view tasks in the DLQ, and clear failed tasks from the DLQ.

## Technologies Used

- **BullMQ:** A powerful queue system for Node.js, with support for background jobs, retries, and scheduling.
- **Redis:** In-memory data store used as the backend for task management.
- **Express.js:** Web framework for building the API to interact with the task queue system.
- **Node.js:** JavaScript runtime for building the backend service.

## Getting Started

To get started with this service, follow these steps:

### 1. Install Redis

First, you need to have Redis running on your system. Install Redis and start the server:

```bash
redis-server
```

### 2. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/slowmoe17/task-queue-system.git
cd task-queue-system
```

### 3. Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```makefile
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 5. Start the Application

Run the server with the following command:

```bash
node src/server.js
```

This will start the Express server on `http://localhost:3000`.

## API Endpoints

### 1. Add a Task

`POST /api/tasks`

Add a new task to the queue.

#### Request Body

```json
{
  "type": "email",           // Type of task (e.g., email, report-generation)
  "payload": {               // Data for processing
    "recipient": "user@example.com",
    "message": "Hello, World!"
  },
  "visibility_time": "2025-01-01T12:00:00Z" // Optional visibility time (when the task becomes eligible for processing)
}
```

#### Response

```json
{
  "id": "<task-id>",
  "status": "Task added to queue"
}
```

### 2. View Dead-Letter Queue (DLQ)

`GET /api/dlq`

Fetch tasks that failed after multiple retries.

#### Response

```json
[
  {
    "id": "<task-id>",
    "type": "<task-type>",
    "payload": {...},
    "error": "<error-message>"
  }
]
```

### 3. Clear Dead-Letter Queue (DLQ)

`DELETE /api/dlq`

Remove all tasks from the DLQ.

#### Response

```json
{
  "status": "DLQ cleared"
}
```
