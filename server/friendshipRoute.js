'use strict'

const db = require('APP/db')
const express = require('express')
const router = express.Router()

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

const User = db.model('users')
const Drawing = db.model('drawing')
const Version = db.model('version')
const Friendship = db.model('friendship')

router.get('/', mustBeLoggedIn, async (req, res, next) => {
  try {
    const friendships = await req.user.getAllFriendships()
    return res.json(friendships)
  } catch(next){ console.error(next) }
})

router.post('/', mustBeLoggedIn, async (req, res, next) => {
  try {
    const newFriend = await User.findById(Number(req.body.id), {include: [{
        model: Drawing,
        include: [ Version ]
      }]
    })
    
    const newFriendship = await Friendship.create({
      follower_id: req.user.id,
      followee_id: newFriend.id,
    })

    const friendshipWithInfo = await Friendship.findById(newFriendship.id, {
      include: [{
        model: Drawing,
        as: 'chat_drawing',
        include: [ Version.scope('recent') ]
      }]
    })
    
    return res.json([newFriend, friendshipWithInfo])
  } catch(next){ console.error(next) }
})


router.delete('/:id', mustBeLoggedIn, async (req, res, next) => {
  try {

    const removeFriend = await User.findById(req.params.id, {include: [Drawing]})

    const friendship = await Friendship.findOne({
      where: {
          follower_id: req.user.id, 
          followee_id: req.params.id
      }
    })
    let friendshipInfo = friendship
    await friendship.destroy()
    return res.send([removeFriend, friendshipInfo])
  } catch(next){ console.error(next) }
})

module.exports = router;
