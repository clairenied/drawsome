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

module.exports = router;
