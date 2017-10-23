const moment = require('moment')
const uuidv1 = require('uuid/v1')
// const nodemailer = require('nodemailer')
const usersModel = require('../models/users')
moment.locale('zh-cn')

// mail option
// const mailTransport = nodemailer.createTransport({
//   host: 'smtp.qq.com',
//   secureConnection: true,
//   auth: {
//     user: '511984775@qq.com',
//     pass: ''
//   }
// })

// function sendMail(username) {
//   const options = {
//     from: '511984775 <511984775@qq.com>',
//     to: 'Ash_Shen <mail@ashshen.cc>',
//     subject: 'notebook新用户注册',
//     text: '有新用户注册啦！账号：' + username
//   }

//   mailTransport.sendMail(options, function(err, msg) {
//     if (err) {
//       console.error(err)
//     } else {
//       console.info(msg)
//     }
//   })
// }

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
  usersModel.findUser({ userName })
  .then(result => {
    if (result.length) {
      return res.status(200).json({
        success: false,
        errorMsg: 'Sorry, this username has aleady exist.'
      })
    }
    return usersModel.newUser({
      id: uuidv1(),
      userName,
      password,
      email,
      createTime: moment().format('x')
    })
  })
  .then(result => {
    if (result.success === false) return
    const data = result._doc
    // sendMail(userName)
    return res
    .status(200)
    .cookie('userId', data.id, { httpOnly: true })
    .json({
      success: true,
      data: {
        userName: data.userName,
        email: data.email,
        id: data.id
      },
      errorMsg: ''
    })
  })
  .catch(err => {
    return res.status(400).json({
      success: false,
      errorMsg: err
    })
  })
}

// POST /auth/login
exports.login = function (req, res) {
  const userName = (req.body.userName || '').trim()
  const password = (req.body.password || '').trim()
  usersModel.findUser({
    userName,
    password
  })
  .then(result => {
    if (!result.length) {
      return res.status(200).json({
        success: false,
        errorMsg: 'Error username or password.'
      })
    }
    const data = result[0]._doc
    return res
    .status(200)
    .cookie('userId', data.id, { httpOnly: true })
    .json({
      success: true,
      data: {
        userName: data.userName,
        email: data.email,
        id: data.id
      },
      errorMsg: ''
    })
  })
  .catch(err => {
    return res.status(400).json({
      success: false,
      errorMsg: err
    })
  })
}

// DELETE /auth/logout
exports.logout = function (req, res) {
  res.status(200).clearCookie().json({})
}
