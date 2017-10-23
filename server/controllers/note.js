// mongoDB
const noteModel = require('../models/note')
const moment = require('moment')
const uuidv1 = require('uuid/v1')
moment.locale('zh-cn')

const listDeal = (req, res, type = 'all') => {
  noteModel.noteList({
    userId: req.cookies.userId
  })
  .then(result => {
    const data = result.map(item => {
      const { id, notebookId, userId, title, content, updateTime } = item
      return type === 'all' ? {
        id,
        notebookId,
        userId,
        title,
        content,
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
exports.notesList = function (req, res) {
  listDeal(req, res)
}

// GET /note/notesUpdateList
exports.notesUpdateList = function (req, res) {
  listDeal(req, res, 'update')
}

// post /note/newNote
exports.newNote = function (req, res) {
  noteModel.newNote({
    id: uuidv1(),
    notebookId: req.body.notebookId,
    userId: req.cookies.userId,
    title: '',
    content: '',
    updateTime: moment().format('x')
  })
  .then(result => {
    const { id, notebookId, userId, title, content, updateTime } = result._doc
    return res.status(200).json({
      success: true,
      data: {
        id,
        notebookId,
        userId,
        title,
        content,
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
exports.saveNote = function (req, res) {
  noteModel.updateNote({
    id: req.body.id,
    userId: req.cookies.userId
  }, req.body)
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
