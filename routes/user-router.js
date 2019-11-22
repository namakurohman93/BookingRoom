'use strict'

const express = require('express')
const router = express.Router()

const { userRoleChecker } = require('../helpers')
const { Floor, User, Room, UserRoom } = require('../models')


router.use(userRoleChecker)


router.get('/', (request, response) => {
  let floorsObj
  Floor.findAll({include: [Room]})
    .then(floors => {
      floorsObj = floors.map(floor => floor.dataValues)

      return UserRoom.findAll({include: [User, Room], where: {UserId: request.session.user.id}})
    })
    .then(userRooms => {
      let data = {
        floors: floorsObj,
        userRooms: userRooms.map(userRoom => userRoom.dataValues)
      }

      response.render('formUserIndex', { data, username: request.session.user.name })
    })
    .catch(err => response.send(err))
})

router.get('/addBooking/:roomId', (request, response) => {
  // response.send(request.session)
  Room.findByPk(request.params.roomId, {include: [Floor]})
    .then(room => {
      let data = {
        room: room.dataValues
      }
      response.render('addBookingPage', { data, username: request.session.user.name })
    })
    .catch(err => response.send(err))
})

router.post('/addBooking/:roomId', (request, response) => {
  let data = {
    RoomId: request.params.roomId,
    UserId: request.session.user.id,
    book_date_start: `${request.body.book_date_start} ${request.body.book_time_start}`,
    book_date_end: `${request.body.book_date_end} ${request.body.book_time_end}`,
    participant: request.body.capacity,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  UserRoom.create(data)
    .then(userRoom => response.redirect('/users'))
    .catch(err => response.send(err))
})

module.exports = router
