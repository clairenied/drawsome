'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Drawing = require('./drawing')
const Version = require('./version')

User.belongsToMany(User, { as: 'friend', through: 'friendTable'})

User.belongsToMany(Drawing, { through: 'userDrawing'})
Drawing.belongsToMany(User, { through: 'userDrawing'})
Drawing.belongsTo(Drawing, {as: 'parentDrawing'})

Drawing.hasMany(Version)
Version.belongsTo(Drawing)


User.hasMany(Version)
Version.belongsTo(User)

module.exports = {User}
