const db = require('APP/db')
const express = require('express')
const router = express.Router()
const Drawing = db.model('drawing')
const Version = db.model('version')
const User = db.model('users')


router.get('/:id', (req, res, next) => { 
   return User.findById(req.params.id,{
	include: [{model: Drawing, include:[Version.scope('recent')]}]
	})
	.then((user) => {
		res.json(user)
	})
	.catch(next)
})

module.exports = router;
