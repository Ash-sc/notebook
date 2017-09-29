const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require('./routes/')
const notFound = require('./middlewares/notFound')
const simpleLogger = require('./middlewares/simpleLogger')
const resAjaxReturn = require('./middlewares/res.ajaxReturn')

var app = express()
app.use(bodyParser.json())
app.use(cookieParser)
app.use(bodyParser.urlencoded({ extended: false }))

app.use(simpleLogger)
app.use(resAjaxReturn)

// 根据 app.<verb>(<path>, <[middlewares]?>, <handler>) 挂载路由
routes.forEach(function (route) {
  var args = [route.path]
  if (route.middlewares) args.push(route.middlewares)
  args.push(route.handler)

  app[route.method.toLowerCase()].apply(app, args)
})

app.use(notFound)

app.listen(8989)

module.exports = app
