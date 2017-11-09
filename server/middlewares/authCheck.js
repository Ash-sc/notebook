module.exports = function (req, res, next) {
  if (!req.cookies.userId) {
    res.status(400).json({
      success: false,
      errorMsg: 'not login!'
    })
  } else {
    next()
  }
}
