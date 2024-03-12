import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import session from 'express-session'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import passport from "./controllers/passport"
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaClient } from '@prisma/client'

// import path from 'path'

const app: Application = express()

// app.use(express.static(path.join(__dirname, 'public')));
const prisma: any = new PrismaClient()

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000 // set session expiration time to 24 hour
  },
  store: new PrismaSessionStore(
    prisma,
    {
      checkPeriod: 2 * 60 * 1000,  //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
}))

app.use(passport.authenticate('session'));

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/auth', require('./routes/auth.route'))
app.use('/myStore', require('./routes/myStore.route'))
app.use('/order', require('./routes/order.route'))
app.use('/user', require('./routes/user.route'))

app.use(function (req, res, next) {
  next(createError(404))
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message,
    },
  })
};

app.use(errorHandler)

module.exports = {
  path: '/api',
  handler: app,
}

export default app
