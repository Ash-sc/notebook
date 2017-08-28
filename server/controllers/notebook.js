// mongoDB
const notebooksModel = require('../mongo/').notebooksModel
const moment = require('moment')
moment.locale('zh-cn')

// GET /notebook/list
exports.fetchList = function (req, res) {
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
    id: 2,
    userId: 1,
    name: '笔记本B',
    notesNum: 2,
    updateTime: moment().format('x')
  }, (err) => {
    console.log(err)
  })
}
