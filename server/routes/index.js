var authCtrls = require('../controllers/auth'),
  notebookCtrls = require('../controllers/notebook'),
  interceptor = require('../middlewares/interceptor');

module.exports = [{
  path: '/notebook/fetchList',
  method: 'GET',
  handler: notebookCtrls.fetchList
}, {
  path: '/notebook/newNotebook',
  method: 'POST',
  handler: notebookCtrls.newNotebook
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
