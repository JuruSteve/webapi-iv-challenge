const dotenv = require('dotenv').config('.env')
const express = require('express')
const helmet = require('helmet')
const postsRouter = require('./routes/postsRouter')
const usersRouter = require('./routes/usersRouter')
const server = express()
server.use(express.json())
server.use(helmet())

server.get('/', (req, res) => {
  res.send(`
    <h1>${process.env.WELCOME} To JS Blog API</h1>
    `)
})
server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

server.listen(4003, () => {
  console.log('Api Ready')
})
