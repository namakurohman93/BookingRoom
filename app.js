'use strict'

const express = require('express')
const route = require('./routes')
const cookieParser = require('cookie-parser')

let app = express();
let PORT = process.env.PORT || 3000; //port heroku

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
app.use(cookieParser());

app.use('/', route);
app.get('/', (request, response) => {
  response.render('formEditFloor')
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
