// GET /notebook/list
exports.fetchList = function (req, res) {
  const data = [
    { name: '默认', id: '1', num: 1, lastUpdateTime: '1503634764388' },
    { name: '服务器', id: '2', num: 0, lastUpdateTime: '1503644764288' },
    { name: '前端', id: '3', num: 1, lastUpdateTime: '1503644724388' },
    { name: '后端', id: '4', num: 2, lastUpdateTime: '1503644764388' }
  ]
  res.status(200).json({
    success: true,
    data
  })
}
