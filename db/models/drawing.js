const Sequelize = require('sequelize')
const db = require('APP/db')
const Version = require('./version')
const User = require('./user')

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
  },
}, {
    instanceMethods: {
      findUsers: function(userIdsArr){
        return this.setUsers(userIdsArr)
        .then(() => this.getUsers())
        .then(users => {
          this.setDataValue('users', users)
          return this
        })
      },
      getComments: function () {
        return Drawing.findAll({
          where: { parent_drawing_id: this.id },
          include: [ Version.scope('recent'), User ]
        })
        .then((comments) => {
          this.setDataValue("comments", comments)
          return this;
        })
      }
    }
})

module.exports = Drawing
