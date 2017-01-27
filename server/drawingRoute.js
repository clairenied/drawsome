const db = require('APP/db')
const express = require('express')
const router = express.Router()

const Drawing = db.model('drawing')
const Version = db.model('version')
const User = db.model('users')




router.get('/', (req, res, next) => {
	Version.findAll({
		where: {
			user_id: req.user.id
		},
		include: [{model: Drawing}]
	})
	.then( drawings => res.send(drawings))
	.catch(next)
})

router.post('/', (req, res, next) => {
	Drawing.create(req.body)
	.then(drawing => res.send(drawing))
	.catch(next);
})

router.get('/masterpieces', (req, res, next) => {
	
	// User.findAll({
	// 	where : {
	// 		friend_id : user_id
	// 	}
	// })
	res.json({
		name: "drawing",
		type: "masterpieces"
	})
})

module.exports = router;



