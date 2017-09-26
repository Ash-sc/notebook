import axios from 'axios'

const rootPath = '/api' // 后端 API 根路径

const xhr = ({ method = 'get', url, body = null }) => {
  // 由于引入了 es6-shim，因此这里完全可以使用原生 Promise
  const defer = $.Deferred()

  const queryString = data => {
    let str = ''
    const body = typeof data === 'object' ? data : {}
    Object.keys(body || {}).forEach((key, index) => {
      str += (index === 0 ? '?' : '&') + key + '=' + body[key]
    })
    return str
  }

  axios({
    method: method,
    url: rootPath + url + (method === 'get' ? queryString(body) : ''),
    data: body
  }).then(res => {
    const { status, data } = res
    if (status !== 200) {
      return defer.reject(data)
    }
    defer.resolve(data.data)
  }).catch(err => {
    console.log(err, 2)
  })

  return defer.promise()
}

export default xhr
