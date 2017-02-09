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
      include: [{
        model: Version.scope('recent'),
        include: [ Drawing ],
        limit: 50,
      },{
        model: Drawing,
        as: 'parent_drawing'
      }]
    })
  const commentdrawings = await drawings.map(drawing  => drawing.getComments())
    return res.send(commentdrawings)
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
    return Version.create({
      drawing_id: drawing.id,
      user_id: req.body.userId,
      number: 1,
      data: req.body.json
    })
  })
  .then(version => {
    return Drawing.findById(version.dataValues.drawing_id, {include: [{model: Version}]})
  })
  .then(drawing => {
    res.json(drawing)
  })
  .catch(next);
})

router.post('/comment', (req, res, next) => {
  return Drawing.create({
    type: "comment",
    canEdit: req.body.canEdit,
    private: req.body.priv,
    likes: 0,
    parent_drawing_id: Number(req.body.masterpiece.id)
  })
  .then(drawing => {
    return Version.create({
      drawing_id: drawing.id,
      user_id: Number(req.body.userId),
      number: 1,
      data: req.body.json
    })
  })
  .then(version => {
    return Promise.all([version, Drawing.findById(version.drawing_id, {
      include: [Version] })
    ])
  })
  .then(drawing => {
    res.send(drawing)
  })
  .catch(next);
})

router.put('/:id', (req, res, next) => {
  return Version.findAll({
    where: {drawing_id: req.params.id}
  })
  .then(versionData => {
    versionData.sort(function(a,b){
      return a.number - b.number
    })
    return Version.create({
      drawing_id: req.params.id,
      user_id: req.body.userId,
      number: versionData[0].number + 1,
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
  .then(versionData => {
    versionData.sort(function(a,b){
      return a.number - b.number
    })
    res.json(data[0])
  })
})

router.delete('/', (req, res, next) => {
  console.log('************************************',req.body.drawingId);
  return Version.destroy({
    where: {drawing_id: req.body.drawingId}
  })
  .then(() => {
    return Drawing.destroy({
      where: {
        id: req.body.drawingId
      }
    })
    res.send()
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
  .then(versionData => {
    versionData.sort(function(a,b){
      return a.number - b.number
    })
    return Version.create({
      drawing_id: req.params.id,
      user_id: req.body.userId,
      number: versionData[0].number + 1,
      data: req.body.json
    })
  })
  .then(version => {
    return Drawing.findById(req.params.id, {include: [{model: Version}]})
  })
  .then(drawing => res.json(drawing))
  .catch(next);
})

module.exports = router;


// const db = require('APP/db')
// const express = require('express')
// const router = express.Router()
// const Drawing = db.model('drawing')
// const Version = db.model('version')
// const User = db.model('users')


// router.get('/:id', (req, res, next) => {
// 	let userprofile;
//    return User.findById(req.params.id,{
// 	include: [{model: Drawing, include:[Version.scope('recent')]}]
// 	})
// 	.then((user) =>{
// 		userprofile = user;
// 		let userdrawings = user.drawings;
// 		let promisedrawings = userdrawings.map(drawing  => drawing.getComments())
// 		return Promise.all(promisedrawings)
// 	})
// 	.then((drawings) => {
// 		userprofile.setDataValue("profdrawings", drawings)
// 		res.json(userprofile)
// 	})
// })

// module.exports = router;
