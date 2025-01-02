const express = require('express')
const app = express()
const port = 8000
app.use(express.json())

const taskRoutes = require('./routes/taskRoutes')
app.use('/api', taskRoutes);


app.listen(port, () => console.log(`app listening on port ${port}!`))


module.exports = app;
