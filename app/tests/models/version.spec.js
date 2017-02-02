'use strict'

const db = require('APP/db')
const Version = require('APP/db/models/version')
const Drawing = require('APP/db/models/drawing')

const {expect} = require('chai')

describe('version', () => {
  before('wait for the db', () => db.didSync)

  describe('Version Recent Validation', () => {
    it('Should return the most recent version of drawing', () => {
       let testVersion = [];
       let testDrawing = {};
       return Version.create({number:2})
       .then(version2=> {
         testVersion.push(version2)
       })
       .then(()=> Version.create({number:1}))
       .then(version1=> {
         testVersion.push(version1)
       })
       .then(()=> Drawing.create({name: 'testing', type: 'masterpiece', canEdit: true, private:true, likes:1}))
       .then(drawing => testDrawing = drawing)

       .then(()=> Promise.all([
          testVersion[0].setDrawing(testDrawing),
          testVersion[1].setDrawing(testDrawing)
        ]))
        .then(()=> Drawing.findOne({
          where: {
            name: 'testing'
          },
          include:[Version.scope('recent')]
        }))
        .then(draw => expect(draw.dataValues.versions[0].dataValues.number).to.equal(2))
     })
   })
  })
