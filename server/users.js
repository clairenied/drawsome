'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

module.exports = require('express').Router()
	

	.get('/shape', (req, res, next) => {
    return User.findAll({
		where : {
			id : 2
		}
	})
    .then(user => res.send(user))
  .catch(next);
});