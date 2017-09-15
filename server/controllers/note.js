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
      })
      res.json({
        success: true,
        data
      })
    }
  })
  // res.status(200).json({
  //   success: true,
  //   data: [
  //     {
  //       title: 'Hello Ash, 13213123123123123123123112  121321 2312 312 23123',
  //       content: 'This is a test note'
  //     },
  //     {
  //       title: 'Hello 2',
  //       content: 'This is a test note 2'
  //     },
  //     {
  //       title: 'Hello 3',
  //       content: 'This is a test note 3'
  //     },
  //     {
  //       title: 'Hello 4',
  //       content: 'This is a test note 4'
  //     }
  //   ]
  // })
}

// post /note/newNote
exports.newNote = function (req, res) {
  notesModel.create({
    id: uuidv1(),
    notebookId: '1503986361290339f90c0-8c7f-11e7-90af-8f74e5d55156',
    userId: 1,
    title: req.body.title || '未命名',
    content: req.body.content || '',
    updateTime: moment().format('x')
  }, (err) => {
    res.status(200).json({
      success: !err,
      data: {},
      errorMsg: err
    })
  })
}

// post /note/saveNote
exports.saveNote = function (req, res) {
  notesModel.update({
    notebookId: req.body.notebookId
  }, req.body, (err) => {
    res.status(200).json({
      success: !err,
      data: {},
      errorMsg: err
    })
  })
}
