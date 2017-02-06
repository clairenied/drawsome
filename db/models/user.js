'use strict'

const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')

const db = require('APP/db')
const Friendship = require('./friendship')
const Drawing = require('./drawing')
const Version = require('./version')


const User = db.define('users', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthday: Sequelize.DATE,
  email: {
    type: Sequelize.STRING,
    validate: {
			isEmail: true,
			notEmpty: true,
		}
  },
  googleId: {
    type: Sequelize.STRING
  },

  // We support oauth, so users may or may not have passwords.
  password_digest: Sequelize.STRING,
	password: Sequelize.VIRTUAL
}, {
  getterMethods: {
    fullName: function()  { return this.firstName + ' ' + this.lastName }
  },

	indexes: [{fields: ['email'], unique: true,}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    },
    getAllFriendships() {
      return Friendship.findAll({
        where: {
          $or: [{
            follower_id: this.id,
          },{
            followee_id: this.id,
          }]
        },
        include: [{
          model: User,
          as: 'follower',
          include: [{
            model: Drawing,
            include: [ Version.scope('recent') ]
          }]
        },{
          model: User,
          as: 'followee',
        }] 
      })
    }
  }
})

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
	  bcrypt.hash(user.get('password'), 10, (err, hash) => {
		  if (err) reject(err)
		  user.set('password_digest', hash)
      resolve(user)
	  })
  )
}

module.exports = User
