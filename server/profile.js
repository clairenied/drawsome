const db = require('APP/db')
const express = require('express')
const router = express.Router()
const Drawing = db.model('drawing')
const Version = db.model('version')
const User = db.model('users')


router.get('/:id', (req, res, next) => { 
	let userprofile;
   return User.findById(req.params.id,{
	include: [{model: Drawing, include:[Version.scope('recent')]}]
	})
	.then((user) =>{
		userprofile = user;
		let userdrawings = user.drawings;
		let promisedrawings = userdrawings.map(drawing  => drawing.getComments())
		return Promise.all(promisedrawings)
	})
	.then((drawings) => {
		userprofile.setDataValue("profdrawings", drawings)
		res.json(userprofile)
	})
})
	
module.exports = router;
