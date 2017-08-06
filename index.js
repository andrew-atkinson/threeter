const db = require('./db')
const path = require('path')
const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 1337
const app = express()
const server = app.listen(PORT)

db.sync({ force: true }).then(() => console.log('Database is synced'))

// logging middleware
app.use(volleyball)

// static middleware
app.use(express.static(path.join(__dirname, '/node_modules')))
app.use(express.static(path.join(__dirname, '/public')))

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// // 'API' routes
app.use('/api', require('./api/get.js'))

// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
)

// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
)

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
)