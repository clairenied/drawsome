const Sequelize = require('sequelize')
const db = require('APP/db')

const Version = db.define('version', {
  versionNumber: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  versionData: {
    type: Sequelize.JSON,
  }
}, {})

module.exports = Version