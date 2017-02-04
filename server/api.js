'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./authRoute'))
  .use('/users', require('./userRoute'))
  .use('/messages', require('./messageRoute'))
  .use('/drawings', require('./drawingRoute'))
  .use('/profile', require('./profile'))


// No routes matched? 404.
api.use((req, res) => res.status(404).end())