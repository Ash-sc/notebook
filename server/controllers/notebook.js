// mongoDB
const notebookModel = require('../models/notebook')
const noteModel = require('../models/note')
const moment = require('moment')
const uuidv1 = require('uuid/v1')
moment.locale('zh-cn')

// GET /notebook/notebooksList
exports.notebooksList = function (req, res) {
  notebookModel.getList({
    userId: req.cookies.userId
  })
  .then(result => {
    const data = result.map(item => {
      return {
        name: item.name,
        id: item.id,
        num: item.notesNum,
        lastUpdateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    })
    res.status(200).json({
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

// POST /notebook/newNotebook
exports.newNotebook = function (req, res) {
  notebookModel.newNotebook({
    id: uuidv1(),
    userId: req.cookies.userId,
    name: req.body.notebookName,
    type: req.body.notebookType,
    notesNum: 0,
    updateTime: moment().format('x')
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

// POST /notebook/deleteNotebook
exports.deleteNotebook = function (req, res) {
  const notebookId = req.body.notebookId
  notebookModel.deleteNotebook({
    id: notebookId
  })
  .then(() => {
    return noteModel.deleteNote({
      notebookId
    })
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
