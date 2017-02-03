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

router.post('/', (req, res, next) => {
  let updatedDrawing
  let newVersion
  let oldVersion

  return Drawing.findAll({
    where: {
      type: "chat",
    },
    include: [{
      model: User,
      where: {
        id: req.body.loggedInUser,
      }
    },{
      model: Version.scope('recent'),
    }],
  })
  .then(drawingsArr => {
    console.log(drawingsArr)
    if(drawingsArr.length){
      updatedDrawing = drawing
      oldVersion = updatedDrawing.versions
    } else {
      console.log('I AM HAPPENING!!!!!!!')
      return Drawing.create({
        type: "chat",
        canEdit: true,
        private: true,
        likes: 0,
      })
      .then(drawing => updatedDrawing = drawing)
    }
  })
  // .then(() => {
  //   return updatedDrawing.findUsers([ req.body.loggedInUser, req.body.friendUser ])
  // })
  // .then(drawing => {
  //   updatedDrawing = drawing
  //   let newVersionNumber = updatedDrawing.versions && updatedDrawing.versions.length ? ++updatedDrawing.versions[0].number : 1
  //   return Version.create({
  //     number: newVersionNumber,
  //     data: req.body.drawingData,
  //     user_id: req.body.loggedInUser,
  //   })
  // })
  // .then(version => {
  //   return version.setDrawing(updatedDrawing)
  // })
  // .then(version => res.send(version))
  .catch(next)
})

module.exports = router