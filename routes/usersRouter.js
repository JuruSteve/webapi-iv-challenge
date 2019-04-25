// implement your API here
const express = require('express')
const db = require('../data/helpers/userDb')
const router = express.Router()

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(201).json(users)
    })
    .catch(e => {
      res.status(500).json({ error: 'The users information could not be retrieved.' })
    })
})

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
    .then(usersPosts => {
      res.status(201).json(usersPosts)
    })
    .catch(e => {
      res.status(500).json({ error: 'The users information could not be retrieved.' })
    })
})

router.get('/:id', (req, res) => {
  const userId = req.params.id
  db.getById(userId)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' })
      } else {
        res.status(201).json(user)
      }
    })
    .catch(e => {
      res.status(404).json({ error: 'The user information could not be retrieved.' })
    })
})

router.post('/', (req, res) => {
  const newUser = req.body
  if (newUser.name === '' || newUser.bio === '') {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
  } else {
    db.insert(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(e => {
        res.status(500).send({ error: 'There was an error while saving the user to the database' })
      })
  }
})

router.put('/:id', (req, res) => {
  const userId = req.params.id
  const newUser = req.body
  if (!newUser.name || newUser.name === '' && !newUser.bio || newUser.bio === '') {
    // console.log(newUser)
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
  } else {
    db.update(userId, req.body)
      .then(num => {
        if (num === 0) {
          res.status(404).json({ message: 'The user with the specified ID does not exist.' })
        } else {
          res.status(200).json(num)
        }
      })
      .catch(e => {
        res.status(500).json({ error: 'The user information could not be modified.' })
      })
  }
})

router.delete('/:id', (req, res) => {
  const userId = req.params.id
  db.remove(userId).then(num => {
    if (num === 0) {
      res.status(404).json({ message: 'The user with the specified ID does not exist.' })
    }
    res.status(200).json(num)
  }).catch(e => {
    console.log(e)
  })
})

module.exports = router
