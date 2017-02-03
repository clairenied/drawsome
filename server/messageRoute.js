const db = require('APP/db')
const express = require('express')
const router = express.Router()

const Drawing = db.model('drawing')
const Version = db.model('version')
const User = db.model('users')

router.get('/', (req, res, next) => {
  //find all chats where userID = req.loggedInUser
  //fiter those chats for a chat that is associated with req.body.sendingTo
  Drawing.findAll({
    where: {
      type: "chat",
    },
    include: [{
      model: Version.scope('recent')
    },{
      model: User,
      where: { }
    }],
  })
  .then(drawings => {
    return res.send(drawings)
  })
  .catch(next)
})

router.post('/', async (req, res, next) => {
  try {
    const drawing = await Drawing.findById(req.body.drawingId, {
      include: {
        model: Version.scope('recent')
      }
    })

    const version = await Version.create({
      user_id: req.body.loggedInUser,
      drawing_id: req.body.drawingId,
      number: ++drawing.versions[0].number,
      data: req.body.drawingData
    })  

    return res.send(version)
  } catch(next){}
})

module.exports = router