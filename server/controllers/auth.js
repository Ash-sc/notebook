const userModel = require('../mongo/').userModel
const moment = require('moment')
const uuidv1 = require('uuid/v1')
moment.locale('zh-cn')

// GET /auth/checkLogin
exports.checkLogin = function (req, res) {
  res.status(200).json({
    success: true,
    data: {}
  })
}

// POST /auth/signUp
exports.signUp = function (req, res) {
  const userName = (req.body.userName || '').trim()
  const password = (req.body.password || '').trim()
  const email = (req.body.email || '').trim()
  userModel.find({
    userName
  }, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        errorMsg: '数据库查询错误'
      })
    } else if (result.length) {
      res.status(200).json({
        success: false,
        errorMsg: '该用户已存在'
      })
    } else {
      userModel.create({
        id: uuidv1(),
        userName,
        password,
        email,
        createTime: moment().format('x')
      }, (e, info) => {
        const { id } = info._doc
        res.status(200)
        res.cookie('userId', id, { httpOnly: true })
        res.json({
          success: !e,
          data: info._doc,
          errorMsg: e
        })
      })
    }
  })
}

// POST /auth/login
exports.login = function (req, res) {
  const userName = (req.body.userName || '').trim()
  const password = (req.body.password || '').trim()
  userModel.find({
    userName,
    password
  }, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        errorMsg: '数据库查询错误'
      })
    } else if (!result.length) {
      res.status(200).json({
        success: false,
        errorMsg: '用户名密码错误'
      })
    } else {
      const data = result[0]._doc
      res.status(200)
      res.cookie('userId', data.id, { httpOnly: true })
      res.json({
        success: true,
        data,
        errorMsg: ''
      })
    }
  })
}

// DELETE /auth/logout
exports.logout = function (req, res) {
  res.status(200).json({})
}
