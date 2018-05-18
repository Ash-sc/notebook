const userModel = require('../mongo/').userModel
const moment = require('moment')
moment.locale('zh-cn')

exports.findUser = function(query = {}) {
  return new Promise((resolve, reject) => {
    userModel.find(query, (err, result) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve(result)
      }
    })
  })
}

exports.newUser = function(data = {}) {
  return new Promise((resolve, reject) => {
    userModel.create(data, (err, result) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve({ ...result, success: true })
      }
    })
  })
}

exports.updateUser = function(query = {}, data = {}) {
  return new Promise((resolve, reject) => {
    userModel.update(query, data, (err) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve({ success: true })
      }
    })
  })
}
