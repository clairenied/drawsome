const Sequelize = require('sequelize')
const db = require('APP/db')
const Version = require('./version')

const Drawing = db.define('drawing', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM("corpse-head", "corpse-body", "corpse-feet", "chat", "masterpiece", "comment"),
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
  }
}, {
    instanceMethods: {
      getComments: function () {
        return Drawing.findAll({
              where: { parent_drawing_id: this.id },
              include: [Version.scope('recent')]
        })
        .then((comments) => {
          this.setDataValue("comments", comments)
          return this;
        })
      }
    }
})

module.exports = Drawing
