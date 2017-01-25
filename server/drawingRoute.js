const db = require('APP/db')
const express = require('express')
const router = express.Router()

const Drawing = db.model('drawing')
const Version = db.model('version')




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

router.get('/', (req, res, next) => {

})

module.exports = router;



