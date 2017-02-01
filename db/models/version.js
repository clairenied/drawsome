const Sequelize = require('sequelize')
const db = require('APP/db')

const Version = db.define('version', {
  version_number: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  versionData: {
    type: Sequelize.TEXT,
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
}, {
  scopes : {
    recent : {
         order: 'version_number DESC',
         limit: 1
        }
    },

})

module.exports = Version
