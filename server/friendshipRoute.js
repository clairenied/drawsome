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
    const newFriend = await User.findById(req.body.id)
    const newFriendship = await Friendship.create({
      follower: req.user,
      followee: newFriend,
    })
    return res.json(newFriend)
  } catch(next){ console.error(next) }
})

router.delete('/', mustBeLoggedIn, async (req, res, next) => {
  try {
    const removeFriend = await User.findById(req.body.id)
    const friendship = await Friendship.findOne({
      where: {
        $or: [{ 
          follower_id: req.user.id, 
          followee_id: req.body.id, 
        },{
          follower_id: req.body.id, 
          followee_id: req.user.id,
        }]
      }
    })
    await friendship.destroy()
    return res.send(removeFriend)
  } catch(next){ console.error(next) }
})

module.exports = router;
