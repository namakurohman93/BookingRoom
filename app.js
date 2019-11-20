'use strict'

const express = require('express')
const route = require('./routes')

let app = express();
let PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.use('/', route);
app.get('/', (request, response) => {
  response.render('index')
})

app.listen(PORT);
