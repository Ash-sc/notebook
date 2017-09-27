// mongoDB
const notebooksModel = require('../mongo/').notebooksModel
const moment = require('moment')
const uuidv1 = require('uuid/v1')
moment.locale('zh-cn')

// GET /notebook/notebooksList
exports.notebooksList = function (req, res) {
  notebooksModel.find({}, (err, result) => {
    res.status(200)
    if (err) {
      res.json({
        success: false,
        errorMsg: err
      })
    } else {
      const data = result.map(item => {
        return {
          name: item.name,
          id: item.id,
          num: item.notesNum,
          lastUpdateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
      res.json({
        success: true,
        data
      })
    }
  })
}

exports.newNotebook = function (req, res) {

  notebooksModel.create({
    id: uuidv1(),
    userId: 1,
    name: req.body.notebookName,
    type: req.body.notebookType,
    notesNum: 0,
    updateTime: moment().format('x')
  }, (err) => {
    res.status(200).json({
      success: !err,
      data: {},
      errorMsg: err
    })
  })
}
