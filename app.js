const express = require('express')
const session = require('express-session')
const app = express()

const { User, Floor } = require('./models')
const { passwordChecker, getDate } = require('./helpers')
const { userRouter, adminRouter } = require('./routes')

const PORT = 3000

app.locals.getDate = getDate

app.use(session({
  secret: 'random stuff',
  resave: false,
  saveUninitialized: true,
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))

app.set('view engine', 'ejs')

app.use('/users', userRouter)
app.use('/admin', adminRouter)

app.get('/', (request, response) => {
  response.send('ok')
})

app.get('/login', (request, response) => {
  let message

  if (request.query.error !== undefined) message = request.query.error

  response.render('login', { message })
})

app.post('/login', (request, response) => {
  User.findAll({where: {username: request.body.username}})
    .then(users => {
      if (users.length === 0) response.redirect('/login?error=Username or password wrong!')
      else {
        // if (users[0].dataValues.password === request.body.password) {
        if (passwordChecker(request.body.password, users[0].dataValues.password)) {
          request.session.user = {
            name: users[0].username,
            role: users[0].role,
            id: users[0].id,
          }

          if (users[0].role === 'admin') {
            response.redirect('/admin')
          } else if (users[0].role === 'user') {
            response.redirect('/users')
          } else {
            response.redirect('/')
          }
        } else response.redirect('/login?error=Username or password wrong!')
      }
    })
    .catch(err => response.send(err))
})

app.get('/register', (request, response) => {
  let success

  if (request.query.success !== undefined) success = request.query.success

  Floor.findAll({order: [['id', 'ASC']]})
    .then(floors => {
      let data = {
        floors: floors.map(floor => floor.dataValues)
      }

      response.render('registerPage', { success, data })
    })
    .catch(err => response.send(err))
})

app.post('/register', (request, response) => {
  User.create(request.body)
    .then(user => response.redirect('/register?success=Success register'))
    .catch(err => response.send(err))
})

app.get('/logout', (request, response) => {
  request.session.destroy(err => {
    if (err) (err => response.send(err))
    else response.redirect('/login')
  })
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
