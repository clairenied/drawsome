const Sequelize = require('sequelize')
const db = require('APP/db')
const User = require('./user')
const Drawing = require('./drawing')


const Friendship = db.define('friendship',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  instanceMethods: {
    getInverse() {
      return Friendship.findOne({
        where: {
          follower_id: Friendship.followee_id,
          followee_id: Friendship.follower_id
        }
      });
    }
  },
  hooks: {
    beforeCreate: async function(friendship) {
      const inverse = await friendship.getInverse();
      if(inverse) {
        friendship.chat_drawing_id = inverse.chat_drawing_id;
      } else {
        const drawing = await Drawing.create({
          type: 'chat',
          likes: 0,
        });
        friendship.chat_drawing_id = drawing.id;
      }
    }
  },
})

module.exports = Friendship