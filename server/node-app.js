const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const notFound = require('./middlewares/notFound')
const authCheck = require('./middlewares/authCheck')
const simpleLogger = require('./middlewares/simpleLogger')
const resAjaxReturn = require('./middlewares/res.ajaxReturn')

const authRouter = require('./controllers/auth')
const noteRouter = require('./controllers/note')
const notebookRouter = require('./controllers/notebook')

var app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(simpleLogger)
app.use(resAjaxReturn)

app.use('/auth/', authRouter)
app.use(authCheck)
app.use('/note/', noteRouter)
app.use('/notebook/', notebookRouter)

app.use(notFound)

app.listen(8989)

module.exports = app
