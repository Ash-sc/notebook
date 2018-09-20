module.exports = function (req, res, next) {
  const { sessionInfo } = req.session
  if (!sessionInfo || !sessionInfo.username) {
    res.status(200).json({
      success: false,
      errorMsg: 'not login!'
    })
  } else {
    next()
  }
}
