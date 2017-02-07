const db = require('APP/db')
const express = require('express')
const router = express.Router()

const Drawing = db.model('drawing')
const Version = db.model('version')
const User = db.model('users')
const Friendship = db.model('friendship')

router.get('/:id', async (req, res, next) => {
  try {
    const friendship = await Friendship.findById( req.params.id, { 
      include: {
        model: Drawing,
        as: 'chat_drawing',
        include: {
          model: Version.scope('recent'),
          include: [ Drawing ]
        }
      }
    })
    return res.send(friendship.chat_drawing.versions[0])
  } catch(next){ console.error(next) }
})

router.post('/', async (req, res, next) => {
  try {
    const drawing = await Drawing.findById(req.body.drawingId)

    const mostRecentVersion = await Version.findOne({
      where: {
        drawing_id: req.body.drawingId    
      },
      order: 'number DESC',
    })

    const version = await Version.create({
      user_id: req.user.id,
      number: ++mostRecentVersion.number,
      data: req.body.drawingData,
      drawing_id: drawing.id,
    })

    return res.send(version)
  } catch(next){ console.error(next) }
})

module.exports = router