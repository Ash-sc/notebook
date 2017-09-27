// mongoDB
const notesModel = require('../mongo/').notesModel
const moment = require('moment')
const uuidv1 = require('uuid/v1')
moment.locale('zh-cn')

// GET /note/notesList
exports.notesList = function (req, res) {
  notesModel.find({}, (err, result) => {
    res.status(200)
    if (err) {
      res.json({
        success: false,
        errorMsg: err
      })
    } else {
      const data = result.map(item => {
        const { id, notebookId, userId, title, content, updateTime } = item
        return {
          id,
          notebookId,
          userId,
          title,
          content,
          updateTime: moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
        }
      }).sort((a, b) => a.updateTime < b.updateTime)
      res.json({
        success: true,
        data
      })
    }
  })
}

// post /note/newNote
exports.newNote = function (req, res) {
  notesModel.create({
    id: uuidv1(),
    notebookId: req.body.notebookId,
    userId: 1,
    title: '',
    content: '',
    updateTime: moment().format('x')
  }, (err, info) => {
    const { id, notebookId, userId, title, content, updateTime } = info._doc
    res.status(200).json({
      success: !err,
      data: {
        id,
        notebookId,
        userId,
        title,
        content,
        updateTime: moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
      },
      errorMsg: err
    })
  })
}

// post /note/saveNote
exports.saveNote = function (req, res) {
  notesModel.update({
    id: req.body.id
  }, req.body, (err) => {
    res.status(200).json({
      success: !err,
      data: {},
      errorMsg: err
    })
  })
}
