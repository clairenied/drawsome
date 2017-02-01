const Sequelize = require('sequelize')
const db = require('APP/db')

const Drawing = db.define('drawing', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM("corpse-head", "corpse-body", "corpse-feet", "chat", "masterpiece", "comment"),
    allowNull: false
  },
  canEdit: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  private: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  likes: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
}, {})

module.exports = Drawing
