const Sequelize = require('sequelize')
const db = require('APP/db')
const User = require('./user')
const Drawing = require('./drawing')


const Friendship = db.define('friendship',{}, {
  instanceMethods: {
    getInverse() {
      return Friendship.findOne({
        where: {
          user_id: Friendship.friend_id,
          friend_id: Friendship.user_id
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
        const drawing = await Drawing.create({});
        friendship.chat_drawing_id = drawing.id;
      }
    }
  },
})

module.exports = Friendship