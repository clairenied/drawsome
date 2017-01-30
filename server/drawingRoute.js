const db = require('APP/db')
const express = require('express')
const router = express.Router()

const Drawing = db.model('drawing')
const Version = db.model('version')
const User = db.model('users')

router.get('/', (req, res, next) => {
  Version.findAll({
    where: {
      user_id: req.user.id
    },
    include: [{model: Drawing}]
  })
  .then( drawings => res.send(drawings))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Drawing.create({
    name: req.body.name, 
    type: "masterpiece",
    canEdit: true,
    private: true,
    likes: 0
  })
  .then(drawing => {
    Version.create({
      drawing_id: drawing.id,
      versionNumber: 1,
      versionData: req.body.json
    })
  })
  .then(version=> res.json(version))
  .catch(next);
})

router.post('/:id', (req, res, next) => {
  Drawing.findById(req.params.id)
  .then(drawing => {
    Version.findAll({
      where: {drawing_id: drawing.id}
    })
  })
  .then(versionData => {
    versionData.sort(function(a,b){
      return a.versionNumber - b.versionNumber
    })
    Version.create({
      drawing_id: req.params.id,
      versionNumber: versionData[0].versionNumber + 1,
      versionData: req.body.json
    })
  })
  .then(version => res.json(version))
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  Drawing.findById(req.params.id)
  .then(drawing => {
    Version.findAll({
      where: {drawing_id: drawing.id}
    })
  })
  .then(versionData => {
    versionData.sort(function(a,b){
      return a.versionNumber - b.versionNumber
    })
    res.json(versionData[0])
  })
})

module.exports = router;



