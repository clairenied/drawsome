const db = require('APP/db')
const express = require('express')
const router = express.Router()
const _ = require('lodash')

const Drawing = db.model('drawing')
const Version = db.model('version')
const Friendship = db.model('friendship')
const User = db.model('users')

router.get('/', async (req, res, next) => {
  try {
    const drawings = await Drawing.findAll({
      include: {
        model: Version.scope('recent'),
        include: [ Drawing ],
        limit: 50,
      }
    })
    console.log(drawings)
    return res.send(drawings)
  } catch(next){ console.error(next) }
})

router.post('/', (req, res, next) => {
  return Drawing.create({
    name: req.body.name, 
    type: "masterpiece",
    canEdit: req.body.canEdit,
    private: req.body.priv,
    likes: 0
  })
  .then(drawing => {
    return Promise.all([
      drawing.setUsers([req.body.userId]),
      Version.create({
        drawing_id: drawing.id,
        user_id: req.body.userId,
        versionNumber: 1,
        data: req.body.json
      })
    ])
  })
  .then(data => {
    console.log('DATA VALS',data[0][0][0])
    return Drawing.findById(data[0][0][0].dataValues.drawing_id, {include: [{model: Version}]}) 
  })
  .then(drawing => {
    res.json(drawing)
  })
  .catch(next);
})

router.post('/:id', (req, res, next) => {
  return Drawing.findById(req.params.id)
  .then(drawing => {
    return Version.findAll({
      where: {drawing_id: req.params.id}
    })
  })
  .then(data => {
    data.sort(function(a,b){
      return a.versionNumber - b.versionNumber
    })
    return Version.create({
      drawing_id: req.params.id,
      user_id: req.body.userId,
      versionNumber: data[0].versionNumber + 1,
      data: req.body.json
    })
  })
  .then(version => {
    return Drawing.findById(req.params.id, {include: [{model: Version}]})
  })
  .then(drawing => res.json(drawing))
  .catch(next);
})

router.put('/:id', (req, res, next) => {
  return Version.findAll({
    where: {drawing_id: req.params.id}
  })
  .then(data => {
    data.sort(function(a,b){
      return a.versionNumber - b.versionNumber
    })
    return Version.create({
      drawing_id: req.params.id,
      user_id: req.body.userId,
      versionNumber: data[0].versionNumber + 1,
      data: req.body.json
    })
  })
  .then(version => {
    return Drawing.findById(req.params.id)
  })
  .then(drawing => {
    return drawing.update({
      private: false,
      canEdit: req.body.canEdit
    })
  })
  .then(drawing => {
    return Drawing.findById(req.params.id, {include: [{model: Version}]})
  })
  .then(drawing => res.json(drawing))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  return Version.findAll({
    where: {drawing_id: req.params.id}
  })
  .then(data => {
    data.sort(function(a,b){
      return a.versionNumber - b.versionNumber
    })
    res.json(data[0])
  })
})

module.exports = router;