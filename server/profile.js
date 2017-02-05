const db = require('APP/db')
const express = require('express')
const router = express.Router()
const Drawing = db.model('drawing')
const Version = db.model('version')
const User = db.model('users')


router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id, {
			include: [{ 
				model: Version.scope('recent'),
				include: [{
					model: Drawing,
					include: [ Version.scope('recent') ]
				}]
			}]
		}) 

		const versions = user.versions
		return res.json(user)	
	} catch(next) { console.error(next) }
})
	
module.exports = router;