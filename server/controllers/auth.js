const express = require('express')
const router = express.Router()
const moment = require('moment')
const uuidv1 = require('uuid/v1')
// const nodemailer = require('nodemailer')
const usersModel = require('../models/users')
const CryptoJS = require('crypto-js')
const formidable = require('formidable')
const path = require('path')
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
router.get('/checkLogin', (req, res) => {
  res.status(200).json({
    success: true,
    data: {}
  })
})

// POST /auth/signUp
router.post('/signUp', (req, res) => {
  const userName = (req.body.userName || '').trim()
  const password = (req.body.password || '').trim()
  const email = (req.body.email || '').trim()
  usersModel.findUser({
    $or: [{ userName }, { email }]
  })
  .then(result => {
    if (result.length) {
      return res.status(200).json({
        success: false,
        errorMsg: 'Sorry, this username or email has aleady exist.'
      })
    }
    const secretKey = CryptoJS.MD5(userName + password + Math.random())
    const verifyCode = CryptoJS.MD5(userName + new Date().getTime())
    return usersModel.newUser({
      id: uuidv1(),
      userName,
      nickName: userName,
      password,
      email,
      createTime: moment().format('x'),
      secretKey,
      verifyCode,
      hasVerified: false,
      freezen: false
    })
  })
  .then(result => {
    if (!result.success) return
    const data = result._doc

    // sendMail(userName)

    let sessionInfo = {
      username: req.body.userName
    }
    req.session.sessionInfo = sessionInfo
    req.session.save()

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
    return res.status(200).json({
      success: false,
      errorMsg: err
    })
  })
})

// POST /auth/login
router.post('/login', (req, res) => {
  const userName = (req.body.userName || '').trim()
  const password = (req.body.password || '').trim()
  usersModel.findUser({
    userName,
    password,
    freezen: false
  })
  .then(result => {
    let sessionInfo = {
      username: req.body.userName
    }
    req.session.sessionInfo = sessionInfo
    if (!result.length) {
      req.session.sessionInfo = null
      req.session.save()
      return res.status(200).json({
        success: false,
        errorMsg: 'Error username or password.'
      })
    }
    const data = result[0]._doc

    req.session.save()

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
    return res.status(200).json({
      success: false,
      errorMsg: err
    })
  })
})

// POST /auth/currentUserInfo
router.post('/currentUserInfo', (req, res) => {
  if (!req.session || !req.session.sessionInfo) {
    return res.status(200).json({
      success: false,
      errorMsg: 'User not login.'
    })
  }

  const username = req.session.sessionInfo.username

  usersModel.findUser({
    userName: username,
    freezen: false
  })
    .then(result => {
      if (!result.length) {
        return res.status(200).json({
          success: false,
          errorMsg: 'User not exist.'
        })
      }

      const { id, userName, nickName, userImage, email } = result[0]._doc

      return res.status(200).json({
        success: true,
        data: {
          id, userName, nickName, userImage, email
        }
      })
    })
    .catch(err => {
      return res.status(200).json({
        success: false,
        errorMsg: err
      })
    })
})

// POST /auth/changeImage
router.post('/changeImage', (req, res) => {
  const username = req.session.sessionInfo.username

  usersModel.findUser({
    userName: username,
    freezen: false
  })
    .then(result => {
      if (!result.length) {
        return res.status(200).json({
          success: false,
          errorMsg: 'User not exist.'
        })
      }

      const form = new formidable.IncomingForm()
      form.encoding = 'utf-8'
      form.uploadDir = path.resolve(__dirname, '../../userImages/')
      form.keepExtensions = true
      form.hash = false
      form.parse(req, function(err, fields, files) {
        if (err) {
          return res.status(200).json({
            result: 1,
            errorInfo: err
          })
        }
        const userImage = 'https://ashshen.cc:5050/' + files.file.path.split('/').slice(-1).join()
        const { id, userName, nickName, password, email, createTime, secretKey, verifyCode, hasVerified, freezen } = result[0]._doc

        return usersModel.updateUser({
          userName: username
        }, {
          id, userName, nickName, password, email, createTime, secretKey, verifyCode, hasVerified, freezen,
          userImage
        }).then(result => {
          return res.status(200).json({
            success: result.success,
            errorMsg: result.success ? '' : 'Update user image error.'
          })
        })
      })
    })
    .catch(err => {
      return res.status(200).json({
        success: false,
        errorMsg: err
      })
    })
})

// POST /auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy()
  res
  .status(200)
  .cookie('userId', '', { httpOnly: true })
  .json({
    success: true,
    data: {}
  })
})

module.exports = router
