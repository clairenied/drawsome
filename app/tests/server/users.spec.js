const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const Drawing = require('APP/db/models/drawing')
const Version = require('APP/db/models/version')
const app = require('APP/server/start')


describe('/api/users', () => {
  describe('when not logged in', () => {
    it('GET /:id fails 401 (Unauthorized)', () =>
      request(app)
        .get(`/api/users/1`)
        .expect(401)
    )

    it('POST creates a user', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(201)
    )

    it('POST redirects to the user it just made', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          email: 'eve@interloper.com'
        }))
    )
  })
})


// describe('/api/users/searchbar', () => {
//   describe('auth', () => {
//     it('Responds 400 when not logged in', () =>
//       request(app)
//         .get(`/api/users/searchbar`)
//         .expect(401)
//     )
//     it('responds 200 when logged in', () =>
//       request(app)
//         .get(`/api/users/searchbar`)
//
//         .expect(200)
//     )
//   }));
//
//   describe('search', () => {
//     beforeEach(() => {
//       // make 3 users
//     })
//
//     it('finds a user by similar first name', () => {
//       return request(app)
//         .get(`/api/searchbar`)
//         .query({
//           name: 'foo'
//         })
//         .expect(200)
//         .then((results) => {
//           expect(results).to.include()
//         })
//     })
//       it('does not find a user that does not have similar first name')
//       it('finds a user that has similar last name')
//       it('does not find a user that does not have similar last name')
//     }
//   })
