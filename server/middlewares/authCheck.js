module.exports = function (req, res, next) {
  if (!req.session.sessionInfo) {
    res.status(200).json({
      success: false,
      errorMsg: 'not login!'
    })
  } else {
    next()
  }
}
