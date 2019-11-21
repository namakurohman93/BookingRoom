'use strict'

const Floor = require('../models').Floor;
const Room = require('../models').Room;
const User = require('../models').User;
const RoomUser = require('../models').RoomUser;

const express = require('express');
const route = express.Router();

//admin: list
route.get('/floors', function(req,res){
    Floor.findAll()
    .then(floors=>{
        res.send(floors);
        // res.render('floors', {floors: floors})
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.get('/rooms', function(req,res){
    Room.findAll()
    .then(rooms=>{
        res.send(rooms);
        // res.render('rooms', {rooms: rooms})
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.get('/users', function(req,res){
    User.findAll()
    .then(users=>{
        res.send(users);
        // res.render('users', {users: users})
    })
    .catch(err=>{
        res.send(err.message);
    })
})

//admin: create
route.post('/floors/add', function(req,res){
    const floorName = req.body.floorName;

    Floor.create({
        name: floorName
    })
    .then(()=>{
        res.send('successfully create...')
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.post('/rooms/add', function(req,res){
    const roomName = req.body.roomName;
    const capacity = req.body.capacity;
    const FloorId = req.bosy.FloorId;

    Room.create({
        name: roomName,
        capacity: capacity,
        FloorId: FloorId
    })
    .then(()=>{
        res.send('successfully created...');
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.post('/users/add', function(req,res){
    const userName = req.body.userName;
    const password = req.body.password;
    const FloorId = req.body.FloorId;
    const email = req.body.email;

    User.create({
        username: userName,
        password: password,
        FloorId: FloorId,
        email: email
    })
    .then(()=>{
        res.send('successfully created...');
    })
    .catch(err=>{
        res.send(err.message);
    })
})

//admin: delete
route.post('/floors/delete/:id', function(req,res){
    const deleteId = req.body.deleteId;
    const userId = 0;

    Floor.destroy({
        where: {id: deleteId}
    })
    .then(()=>{
        return Room.destroy({
            where: {FloorId: deleteId}
        })
    })
    .then(()=>{
        return User.destroy({
            where: {FloorId: deleteId}
        })
    })
    .then(()=>{
        res.send('successfully deleted...')
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.post('/rooms/delete/:id', function(req,res){
    const deleteId = req.body.deleteId;

    Room.destroy({
        where: {id: deleteId}
    })
    .then(()=>{
        return RoomUser.destroy({
            where: {RoomId: deleteId}
        })
    })
    .then(()=>{
        res.send('successfully deleted...');
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.post('/users/delete/:id', function(req,res){
    const deleteId = req.body.deleteId;

    User.destroy({
        where: {id: deleteId}
    })
    .then(()=>{
        return RoomUser.destroy({
            where: {UserId: deleteId}
        })
    })
    .then(()=>{
        res.send('successfully deleted...');
    })
    .catch(err=>{
        res.send(err.message);
    })
})


//Admin: edit
route.get('/floors/edit/:id', function(req,res){
    const floorId = req.params.id;

    Floor.findByPk(floorId)
    .then(floor=>{
        res.send(floor);
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.post('/floors/edit/:id', function(req,res){
    const floorId = req.params.id;
    const name = req.body.floorName;

    Floor.update(
        {
            name: name
        },
        {
        where: {id: floorId}
        }
    )
    .then(()=>{
        res.send('successfully updated...');
    })
    .catch(err=>{
        res.send(err.message);
    })
})

route.get('/rooms/edit/:id', function(req,res){
    const roomId = req.params.id;
    Room.findByPk(roomId, {include: [Floor]})
    .then(room=>{
        res.send(room);
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.post('/room/edit/:id', function(req,res){
    const roomId = req.params.id;
    const name = req.body.roomName;
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
        res.send('successfully updated...');
    })
    .catch(err=>{
        res.send(err.message);
    })
})

route.get('/users/edit/:id', function(req,res){
    const userId = req.params.id;

    User.findByPk(userId, {include: [Floor]})
    .then(user=>{
        res.send(user);
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.post('/users/edit/:id', function(req,res){
    const userId = req.params.id;
    const userName = req.body.userName;
    const password = req.body.password;
    const FloorId = req.body.FloorId;
    const email = req.body.email;

    User.update(
        {
            username: userName,
            password: password,
            FloorId: FloorId,
            email: email
        },
        {
            where: {id: userId}
        }
    )
    .then(()=>{
        res.send('successfully updated..');
    })
    .catch(err=>{
        res.send(err.message);
    })
})

route.get('/login', function(req,res){
    res.render('index');
})
route.post('/login', function(req,res){
    const userName = req.body.userName;
    const password = req.body.password;

    User.findAll({
        where: {username: userName}
    })
    .then(user=>{
        if(user==null) {
            res.send('username or password wrong!')
        } else if(user[0].dataValues.password==password) {
            res.cookie('userId', user[0].dataValues.id).render('main')
        } else {
            res.send('username or password wrong!')
        }
    })
    .catch(err=>{
        frames.send(err.message);
    })
})
route.get('/logout', function(req,res){
    res.clearCookie('userId')
    res.redirect('/login')
})

route.get('/book', function(req,res){
    Room.findAll({include: [User]})
    .then(rooms=>{
        res.send(rooms);
    })
    .catch(err=>{
        res.send(err.message);
    })
})
route.get('/book/add', function(req,res){
    const userId = req.cookies.userId;
    const roomId = req.body.roomId;
    const bookingDate = req.body.bookingDate;
    const bookingStart = req.body.bookingStart;
    const bookingEnd = req.body.bookingEnd;
    const participant = req.body.participant;

    let statusAvailable = RoomUser.isAvailable(roomId,bookingDate,bookingStart,bookingEnd,participant);

    if(statusAvailable) {
        Room.findByPk(roomId)
        .then(room=>{
            if(room.capacity>participant) {
                return RoomUser.create({
                    UserId: userId,
                    RoomId: roomId,
                    booking_date: bookingDate,
                    booning_start: bookingStart,
                    booking_end: bookingEnd
                })
            } else {
                res.send('not enough capacity');               
            }
        })
        .then(()=>{
            res.send('succesfully booked!');
        })
        .catch(err=>{
            res.send(err.message);
        })
    } else {
        res.send('room no available');
    }
})


module.exports = route
