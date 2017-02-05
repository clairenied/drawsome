'use strict'

const db = require('APP/db')
const Drawing = require('APP/db/models/drawing')
const {expect} = require('chai')

describe('drawing', () => {
  before('wait for the db', () => db.didSync)

  describe('Drawing Validations', () => {
    it('Errors if canEdit field null', () =>
       Drawing.create({ name: 'Four Legged Chicken', type: 'masterpiece', private:true, likes:0 })
        .then(something => {
          expect(true).to.be(false);
        })
        .catch(error => {
          expect(error).to.exist;
        }))

    it("Errors if likes are under 1", () =>
       Drawing.create({ name: 'Four Legged Chicken', type: 'masterpiece', canEdit: true, private:true, likes:-1 })
        .then(something => {
          expect(true).to.be(false);
        })
        .catch(error => {
          expect(error).to.exist;
        }))
  })
})
