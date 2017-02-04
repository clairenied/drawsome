'use strict'

const db = require('APP/db')
const express = require('express')
const router = express.Router()

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

const User = db.model('users')
const Drawing = db.model('drawing')
const Version = db.model('version')
const Friendship = db.model('friendship')


router.get('/', forbidden('only admins can list users'), async (req, res, next) => {
	try {
		const users = await User.findAll()
		return res.json(users)
	} catch(next){}
})

router.post('/', async (req, res, next) => {
	try {
		const users = await User.create(req.body)
		return res.status(201).json(user)
	} catch(next){}
})

router.get('/searchbar', mustBeLoggedIn, async (req, res, next) => {
	try {
		const query = req.query.name
		const users = await User.findAll({
			where: {
				$or: [{
					firstName: { $ilike: '%'+query+'%' }
				},{
					lastName: { $ilike: '%'+query+'%' }
				}]
			}
		})
		return res.send(users)
	} catch(next){}
})

router.get('/:id', mustBeLoggedIn, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		return res.json(user)
	} catch(next){}
})

router.get('/:id/friends', mustBeLoggedIn, async (req, res, next) => {
	try {
		const friends = await User.findById(req.params.id,{
			include: [{
        model: User,
        as: 'followers'
      },{
        model: User,
        as: 'followees'
      },{
      	model: Drawing, 
      	include: [Version, User, {model: Drawing, as: "parent_drawing"}]
      }]
		})
		return res.json(friends)
	} catch(next){ console.error(next) }
})

// router.get('/:id/friends', mustBeLoggedIn, (req, res, next) => {
// 	return User.findById(req.params.id,{

// 	include: [{model: User, as: 'friend', include: [{model: Version},{model: Drawing, include:[User, Version, {model: Drawing, as : "parentDrawing"}]}]}]

// 	})
// 	.then((user) => {
// 		res.json(user)
// 	})
// 	.catch(next)
// })

router.put('/:id/friends', mustBeLoggedIn, (req, res, next) => {
		Friendship.create({
				user_id : req.user.id,
				friend_id : req.params.id
		})
		.then((user) => {
		res.send(user)
		})
		.catch(next)
})

router.delete('/:id/friends', function (req, res, next) {

     Friendship.destroy({
        where : {
          	user_id : req.user.id,
						friend_id : req.params.id
        }
      })
			.then((user) => {
			res.sendStatus(200)
			})
			.catch(next)
});

module.exports = router;
