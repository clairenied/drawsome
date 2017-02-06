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
    const newFriend = await User.findById(Number(req.body.id))
    const newFriendship = await Friendship.create({
      follower_id: req.user.id,
      followee_id: newFriend.id,
    })
    return res.json([newFriend, newFriendship])
  } catch(next){ console.error(next) }
})

router.delete('/:id', mustBeLoggedIn, async (req, res, next) => {
  try {
    console.log('REQUSER THEN REQBODY', req.user.id, req.params.id)
    const removeFriend = await User.findById(req.params.id)
    const friendship = await Friendship.findOne({
      where: {
          follower_id: req.user.id, 
          followee_id: req.params.id
      }
    })
    console.log("friendship", friendship)
    let friendshipInfo = friendship
    await friendship.destroy()
    return res.send([removeFriend, friendshipInfo])
  } catch(next){ console.error(next) }
})

module.exports = router;
