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
// 创建user schema
const userSchema = new mongoose.Schema({
  id: String,
  userName: String,
  nickName: String,
  password: String,
  email: String,
  createTime: { type: Date, default: Date.now },
  secretKey: String,
  verifyCode: String,
  userImage: { type: String, default: 'http://oxjejkjw8.bkt.clouddn.com/image/dog.jpg' },
  hasVerified: Boolean,
  freezen: Boolean
})
// 创建note schema
const notesSchema = new mongoose.Schema({
  id: String,
  notebookId: String,
  userId: String,
  title: String,
  content: String,
  updateTime: Date,
  createTime: { type: Date, default: Date.now }
})
// 创建notebook schema
const notebooksSchema = new mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  type: String,
  updateTime: Date,
  createTime: { type: Date, default: Date.now }
})
// 创建model
const userModel = mongoose.model('users', userSchema)
const notebooksModel = mongoose.model('notebooks', notebooksSchema)
const notesModel = mongoose.model('notes', notesSchema)

module.exports = {
  userModel,
  notebooksModel,
  notesModel
}
