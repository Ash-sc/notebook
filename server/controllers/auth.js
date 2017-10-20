const userModel = require('../mongo/').userModel
const moment = require('moment')
const uuidv1 = require('uuid/v1')
const nodemailer = require('nodemailer')
moment.locale('zh-cn')

// mail option
const mailTransport = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: true,
  auth: {
    user: '511984775@qq.com',
    pass: ''
  }
})

function sendMail(username) {
  const options = {
    from: '511984775 <511984775@qq.com>',
    to: 'Ash_Shen <mail@ashshen.cc>',
    subject: 'notebook新用户注册',
    text: '有新用户注册啦！账号：' + username
  }

  mailTransport.sendMail(options, function(err, msg) {
    if (err) {
      console.error(err)
    } else {
      console.info(msg)
    }
  })
}

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
        errorMsg: 'Server error, please do it later.'
      })
    } else if (result.length) {
      res.status(200).json({
        success: false,
        errorMsg: 'Sorry, this username has aleady exist.'
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
        sendMail(userName)
        res.status(200)
        res.cookie('userId', id, { httpOnly: true })
        res.json({
          success: !e,
          data: {
            userName: info._doc.userName,
            email: info._doc.email,
            id: info._doc.id
          },
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
        errorMsg: 'Server error, please do it later.'
      })
    } else if (!result.length) {
      res.status(200).json({
        success: false,
        errorMsg: 'Error username or password.'
      })
    } else {
      const data = result[0]._doc
      res.status(200)
      res.cookie('userId', data.id, { httpOnly: true })
      res.json({
        success: true,
        data: {
          userName: data.userName,
          email: data.email,
          id: data.id
        },
        errorMsg: ''
      })
    }
  })
}

// DELETE /auth/logout
exports.logout = function (req, res) {
  res.status(200).json({})
}
