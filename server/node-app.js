const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const notFound = require('./middlewares/notFound')
const authCheck = require('./middlewares/authCheck')
const simpleLogger = require('./middlewares/simpleLogger')

const authRouter = require('./controllers/auth')
const noteRouter = require('./controllers/note')
const notebookRouter = require('./controllers/notebook')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

var app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(simpleLogger)

app.use(session({
  secret: 'sesstion-secret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({url: 'mongodb://localhost:27017/session_storage'}),
  cookie: {
		maxAge: 30 * 24 * 3600 * 1000
	}
}))

app.use('/auth/', authRouter)
app.use(authCheck)
app.use('/note/', noteRouter)
app.use('/notebook/', notebookRouter)

app.use(notFound)

app.listen(8989)

module.exports = app
