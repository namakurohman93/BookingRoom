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

    User.create({
        username: userName,
        password: password,
        FloorId: FloorId
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
