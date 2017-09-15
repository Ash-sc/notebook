'use strict'
const mongoose = require('mongoose')
// 连接mongodb
mongoose.connect('mongodb://localhost/notebook_db', { useMongoClient: true })
// 实例化连接对象
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})
// 创建notebook schema
const notebooksSchema = new mongoose.Schema({
  id: String,
  userId: Number,
  name: String,
  type: String,
  notesNum: Number,
  updateTime: Date
})
// 创建model
const notebooksModel = mongoose.model('notebooks', notebooksSchema) // notebooks为创建或选中的集合

module.exports = {
  notebooksModel
}
