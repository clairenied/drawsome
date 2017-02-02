'use strict'

const db = require('APP/db')
const User = require('APP/db/models/user')
const {expect} = require('chai')

describe('User', () => {
  before('wait for the db', () => db.didSync)

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({ firstName: 'George', lastName: 'Washington', password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({ firstName: 'George', lastName: 'Washington', password: 'ok' })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  })

  describe('Get fullName function', () => {
    it('Full name method return First+Last Names', () =>
      User.create({ firstName: 'George', lastName:'Washington' })
        .then(user => user.fullName)
        .then(result => expect(result).to.equal('George Washington')))
  })
})
