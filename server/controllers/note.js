// mongoDB
const noteModel = require('../models/note')
const moment = require('moment')
const uuidv1 = require('uuid/v1')
const CryptoJS = require('crypto-js')
const usersModel = require('../models/users')
moment.locale('zh-cn')

const listDeal = (req, res, type = 'all') => {
  let secretKey = null
  usersModel.findUser({
    id: req.cookies.userId
  })
  .then((result) => {
    secretKey = result[0].secretKey
    return noteModel.noteList({
      userId: req.cookies.userId
    })
  })
  .then(result => {
    const data = result.map(item => {
      const { id, notebookId, title, content, updateTime } = item
      return type === 'all' ? {
        id,
        notebookId,
        title: CryptoJS.AES.decrypt(title, secretKey).toString(CryptoJS.enc.Utf8),
        content: CryptoJS.AES.decrypt(content, secretKey).toString(CryptoJS.enc.Utf8),
        updateTime: moment(updateTime).format('x')
      } : {
        id,
        updateTime: moment(updateTime).format('x')
      }
    }).sort((a, b) => a.updateTime < b.updateTime)
    return res.status(200).json({
      success: true,
      data
    })
  })
  .catch(err => {
    return res.status(200).json({
      success: false,
      errorMsg: err
    })
  })
}
// GET /note/notesList
exports.notesList = function(req, res) {
  if (req.query.keywords) {
    setTimeout(function() {
      res.status(200).json({
        keyWords: req.query.keywords,
        resultList: [
          {
            path: '/1/2/3/4/5',
            title: 'iOS平台',
            content: '受iOS系统限///制，个推SDK服务在iOS平台上无法长期后台运行。当应用在前台运行时，个推SDK服务可以正常运行，可以实时接受服务端的推送消息；当应用在后台期间，个推服务端会动借助Apple Push Notification Server(APNs)实现消息推送，用户启动应用后，个推SDK服务可以重新接受在应用停止期间服务端推送的离线消息。第三方应用开发者需要特别关注这个处理逻辑。'
          },
          {
            path: '/1/2/3/4/5',
            title: 'iOS平台',
            content: '受iOS系统限制，个推SDK服务在iOS平台上无法长期后台运行。当应用在前台运行时，个推SDK服务可以正常运行，可以实时接受服务端的推送消息；当应用在后台期间，个推服务端会动借助Apple Push Notification Server(APNs)实现消息推送，用户启动应用后，个推SDK服务可以重新接受在应用停止期间服务端推送的离线消息。第三方应用开发者需要特别关注这个处理逻辑。'
          },
          {
            path: '/1/2/3/4/5',
            title: 'iOS平台',
            content: '受iOS系统限制，个推SDK服务在iOS平台上无法长期后台运行。当应用在前台运行时，个推SDK服务可以正常运行，可以实时接受服务端的推送消息；当应用在后台期间，个推服务端会动借助Apple Push Notification Server(APNs)实现消息推送，用户启动应用后，个推SDK服务可以重新接受在应用停止期间服务端推送的离线消息。第三方应用开发者需要特别关注这个处理逻辑。'
          }
        ]
      })
    }, 2000)
  } else {
    listDeal(req, res)
  }
}

// GET /note/notesUpdateList
exports.notesUpdateList = function(req, res) {
  listDeal(req, res, 'update')
}

// post /note/newNote
exports.newNote = function(req, res) {
  usersModel.findUser({
    id: req.cookies.userId
  })
  .then(result => {
    const secretKey = result[0].secretKey
    return noteModel.newNote({
      id: uuidv1(),
      notebookId: req.body.notebookId,
      userId: req.cookies.userId,
      title: CryptoJS.AES.encrypt('', secretKey),
      content: CryptoJS.AES.encrypt('', secretKey),
      updateTime: moment().format('x')
    })
  })
  .then(result => {
    const { id, notebookId, userId, updateTime } = result._doc
    return res.status(200).json({
      success: true,
      data: {
        id,
        notebookId,
        userId,
        title: '',
        content: '',
        updateTime: moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
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
}

// post /note/saveNote
exports.saveNote = function(req, res) {
  let secretKey = null
  const userId = req.cookies.userId
  usersModel.findUser({
    id: userId
  })
  .then(result => {
    secretKey = result[0].secretKey
    const { id, notebookId, title, content, updateTime } = req.body
    return noteModel.updateNote({
      id: req.body.id,
      userId
    }, {
      id,
      notebookId,
      userId,
      title: CryptoJS.AES.encrypt(title, secretKey).toString(),
      content: CryptoJS.AES.encrypt(content, secretKey).toString(),
      updateTime
    })
  })
  .then(() => {
    res.status(200).json({
      success: true,
      data: {},
      errorMsg: ''
    })
  })
  .catch(err => {
    return res.status(200).json({
      success: false,
      errorMsg: err
    })
  })
}

// post /note/deleteNote
exports.deleteNote = function(req, res) {
  const id = req.body.id
  noteModel.deleteNote({
    id
  })
  .then(() => {
    return res.status(200).json({
      success: true,
      errorMsg: ''
    })
  })
  .catch(err => {
    return res.status(200).json({
      success: false,
      errorMsg: err
    })
  })
}
