const express = require('express')
const router = express.Router()
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
router.get('/notesList', (req, res) => {
  listDeal(req, res)
})

// GET /note/notesUpdateList
router.get('/notesUpdateList', (req, res) => {
  listDeal(req, res, 'update')
})

// post /note/newNote
router.post('/newNote', (req, res) => {
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
})

// post /note/saveNote
router.post('/saveNote', (req, res) => {
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
})

// post /note/deleteNote
router.post('/deleteNote', (req, res) => {
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
})

module.exports = router
