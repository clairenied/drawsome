'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Drawing = require('./drawing')
const Version = require('./version')
const Friendship = require('./friendship')

User.belongsToMany(User, { 
  as: { singular: 'follower', plural: 'followers' },
  foreignKey: 'follower_id',
  through: {
    model: Friendship,
  }
})

User.belongsToMany(User, { 
  as: { singular: 'followee', plural: 'followees' },
  foreignKey: 'followee_id',
  through: {
    model: Friendship,
  }
});

Friendship.belongsTo(User, { as: 'follower', foreignKey: 'follower_id', })
Friendship.belongsTo(User, { as: 'followee', foreignKey: 'followee_id', })

Friendship.belongsTo(Drawing, { as: 'chat_drawing' })
Drawing.belongsTo(Drawing, { as: 'parent_drawing' })

Drawing.hasMany(Version)
Version.belongsTo(Drawing)

User.hasMany(Version)
Version.belongsTo(User)

User.belongsToMany(Drawing, { 
  through: { 
    model: Version, 
    unique: false 
  } 
});

Drawing.belongsToMany(User, {
  through: {
    model: Version,
    unique: false
  }
})

module.exports = { User, Drawing, Version, Friendship }