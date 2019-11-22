const express = require('express')
const { not } = require('sequelize').Op
const router = express.Router()

const { adminRoleChecker } = require('../helpers')
const { Floor, User, Room, UserRoom } = require('../models')


router.use(adminRoleChecker)

router.get('/', (request, response) => {
  Promise.all([
    Floor.findAll({order: [['id', 'ASC']]}),
    User.findAll({where: {role: {[not]: 'admin'}}, order: [['id', 'ASC']], include: [Floor]}),
    Room.findAll({order: [['id', 'ASC']], include: [Floor]})
  ])
  .then(results => {
    let key = ['floors', 'users', 'rooms']
    let data = {
      floors: [],
      users: [],
      rooms: [],
    }

    results.forEach((result, index) => {
      result.forEach(obj => {
        data[key[index]].push(obj.dataValues)
      })
    })

    response.render('adminPage', { data, username: request.session.user.name })
  })
  .catch(err => response.send(err))
})

router.get('/floors/add', (request, response) => {
  response.render('formAddFloor', { username: request.session.user.name })
})

router.post('/floors/add', (request, response) => {
  Floor.create(request.body)
    .then(floor => response.redirect('/admin'))
    .catch(err => response.send(err))
})

router.get('/user/add', (request, response) => {
  Floor.findAll({order: [['id', 'ASC']]})
    .then(floors => {
      let data = {
        floors: floors.map(floor => floor.dataValues)
      }

      response.render('formAddUser', { data, username: request.session.user.name })
    })
    .catch(err => response.send(err))
})

router.post('/user/add', (request, response) => {
  User.create(request.body)
    .then(user => response.redirect('/admin'))
    .catch(err => response.send(err))
})

router.get('/room/add', (request, response) => {
  Floor.findAll({order: [['id', 'ASC']]})
    .then(floors => {
      let data = {
        floors: floors.map(floor => floor.dataValues)
      }

      response.render('formAddRom', { data, username: request.session.user.name })
    })
    .catch(err => response.send(err))
})

router.post('/room/add', (request, response) => {
  Room.create(request.body)
    .then(room => response.redirect('/admin'))
    .catch(err => response.send(err))
})

router.get('/floor/delete/:id', function(req,res){
    Floor.destroy({
        where: {id: req.params.id}
    })
    .then(()=>{
        return Room.destroy({
            where: {FloorId: req.params.id}
        })
    })
    .then(()=>{
        return User.destroy({
            where: {FloorId: req.params.id}
        })
    })
    .then(()=>{
        res.redirect('/admin')
    })
    .catch(err=>{
        res.send(err.message);
    })
})

router.get('/room/delete/:id', function(req,res){
    Room.destroy({
        where: {id: req.params.id}
    })
    .then(()=>{
        return UserRoom.destroy({
            where: {RoomId: req.params.id}
        })
    })
    .then(()=>{
        res.redirect('/admin')
    })
    .catch(err=>{
        res.send(err.message);
    })
})

router.get('/user/delete/:id', function(req,res){
    User.destroy({
        where: {id: req.params.id}
    })
    .then(()=>{
        return UserRoom.destroy({
            where: {UserId: req.params.id}
        })
    })
    .then(()=>{
        res.redirect('/admin')
    })
    .catch(err=>{
        res.send(err.message);
    })
})

router.get('/floor/edit/:id', function(req,res){
    const floorId = req.params.id;

    Floor.findByPk(floorId)
    .then(floor=>{
        // res.send(floor);
        res.render('formEditFloor', { floor, username: req.session.user.name })
    })
    .catch(err=>{
        res.send(err.message);
    })
})

router.post('/floors/edit/:id', function(req,res){
    const floorId = req.params.id;
    const name = req.body.name;

    Floor.update(
        {
            name: name
        },
        {
        where: {id: floorId}
        }
    )
    .then(()=>{
        res.redirect('/admin')
    })
    .catch(err=>{
        res.send(err.message);
    })
})

router.get('/room/edit/:id', function(req,res){
    const roomId = req.params.id;
    let roomObj
    Room.findByPk(roomId, {include: [Floor]})
    .then(room=>{
        // res.send(room);
        roomObj = room
        return Floor.findAll()
    })
    .then(floors => {
      let data = {
        floors: floors.map(floor => floor.dataValues),
        room: roomObj
      }

      res.render('formEditRoom', { data, username: req.session.user.name })
    })
    .catch(err=>{
        res.send(err.message);
    })
})

router.post('/room/edit/:id', function(req,res){
    const roomId = req.params.id;
    const name = req.body.name;
    const capacity = req.body.capacity;
    const FloorId = req.body.FloorId;

    Room.update(
        {
            name: name,
            capacity: capacity,
            FloorId: FloorId
        },
        {
            where: {id: roomId}
        }
    )
    .then(()=>{
        res.redirect('/admin')
    })
    .catch(err=>{
        res.send(err.message);
    })
})

router.get('/user/edit/:id', function(req,res){
    const userId = req.params.id;
    let userObj

    User.findByPk(userId, {include: [Floor]})
    .then(user=>{
        // res.send(user);
        userObj = user
        return Floor.findAll()
    })
    .then(floors => {
      let data = {
        floors: floors.map(floor => floor.dataValues),
        user: userObj
      }

      res.render('formEditUser', { data, username: req.session.user.name })
    })
    .catch(err=>{
        res.send(err.message);
    })
})

router.post('/user/edit/:id', function(req,res){
    const userId = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const FloorId = req.body.FloorId;
    const email = req.body.email;

    User.update(
        {
            username: username,
            password: password,
            FloorId: FloorId,
            email: email
        },
        {
            where: {id: userId}
        }
    )
    .then(()=>{
        res.redirect('/admin')
    })
    .catch(err=>{
        res.send(err.message);
    })
})


module.exports = router
