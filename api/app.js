const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routes
app.post('/auth/login', (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  // Check user credentials and generate a token
  const token = 'mock-tokens'
  res.json({ token })
})

app.get('/auth/user', (req, res) => {
  res.json({
    user: {
      user_id: 1,
      email: 'devnebula@devnebula.com',
      name: 'Dev Nebula',
      password: 'password',
      google_id: '123',
      facebook_id: '123',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
  })
})

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = {
  path: '/api',
  handler: app,
}
