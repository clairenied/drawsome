// const request = require('supertest-as-promised')
// const {expect} = require('chai')
// const db = require('APP/db')
// const User = require('APP/db/models/user')
// const Drawing = require('APP/db/models/drawing')
// const Version = require('APP/db/models/version')
// const app = require('APP/server/start')
//
//
// describe('/api/drawings', () => {
//   describe('Creates drawings', () => {
//     it.only('POST creates and returns an instance of a drawing', () => {
//       const req = {
//         body: {
//           name: 'Picasso on picasso',
//           canEdit: true,
//           priv: true,
//           userId: 1,
//           json: 'image'
//         }
//       };
//       return request(app)
//         .post('/api/drawings')
//         .send(req)
//         .expect(201)
//       }
//     )
//
//     it('POST redirects to the user it just made', () =>
//       request(app)
//         .post('/api/users')
//         .send({
//           email: 'eve@interloper.com',
//           password: '23456',
//         })
//         .redirects(1)
//         .then(res => expect(res.body).to.contain({
//           email: 'eve@interloper.com'
//         }))
//     )
//   })
// })
