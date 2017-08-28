var msgCtrls = require('../controllers/msg'),
  authCtrls = require('../controllers/auth'),
  notebookCtrls = require('../controllers/notebook'),
  interceptor = require('../middlewares/interceptor');

module.exports = [{
  path: '/notebook/fetchList',
  method: 'GET',
  handler: notebookCtrls.fetchList
}, {
  path: '/msg',
  method: 'POST',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.add
}, {
  path: '/msg/authors',
  method: 'GET',
  handler: msgCtrls.authors
}, {
  path: '/msg/:msgId',
  method: 'GET',
  handler: msgCtrls.getById
}, {
  path: '/msg/:msgId',
  method: 'PUT',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.update
}, {
  path: '/msg/:msgId',
  method: 'DELETE',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.remove
}, {
  path: '/auth/checkLogin',
  method: 'GET',
  handler: authCtrls.checkLogin
}, {
  path: '/auth/login',
  method: 'POST',
  middlewares: [interceptor.FORBID_AUTHED],
  handler: authCtrls.login
}, {
  path: '/auth/logout',
  method: 'DELETE',
  middlewares: [interceptor.NEED_AUTH],
  handler: authCtrls.logout
}];
