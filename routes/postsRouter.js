const express = require('express')
const db = require('../data/helpers/postDb')
const router = express.Router()

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(201).json(posts)
    })
    .catch(e => {
      res.status(500).json({ error: 'The posts information could not be retrieved.' })
    })
})

router.get('/:id', (req, res) => {
  const postId = req.params.id
  db.getById(postId)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' })
      } else {
        res.status(201).json(post)
      }
    })
    .catch(e => {
      res.status(404).json({ error: 'The post information could not be retrieved.' })
    })
})

router.post('/', (req, res) => {
  const newpost = req.body
  if (newpost.title === '' || newpost.contents === '') {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
  } else {
    db.insert(newpost)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(e => {
        res.status(500).send({ error: 'There was an error while saving the post to the database' })
      })
  }
})

router.put('/:id', (req, res) => {
  const postId = req.params.id
  const newpost = req.body
  if (!newpost.title || newpost.title === '' && !newpost.contents || newpost.contents === '') {
    // console.log(newpost)
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
  } else {
    db.update(postId, req.body)
      .then(num => {
        if (num === 0) {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' })
        } else {
          res.status(200).json(num)
        }
      })
      .catch(e => {
        res.status(500).json({ error: 'The post information could not be modified.' })
      })
  }
})

router.delete('/:id', (req, res) => {
  const postId = req.params.id
  db.remove(postId).then(num => {
    if (num === 0) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
    res.status(200).json(num)
  }).catch(e => {
    res.status(500).json({ error: 'The post could not be removed.' })
  })
})

module.exports = router
