const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const path = require('path')
const todoRoutes = require('./routes/todo')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/todo', todoRoutes)

app.use((req, res, next) => {
  res.sendFile('/index.html')
})

app.listen(PORT)