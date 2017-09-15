var authCtrls = require('../controllers/auth'),
  noteCtrls = require('../controllers/note'),
  notebookCtrls = require('../controllers/notebook'),
  interceptor = require('../middlewares/interceptor');

module.exports = [{
  path: '/note/notesList',
  method: 'GET',
  handler: noteCtrls.notesList
}, {
  path: '/notebook/notebooksList',
  method: 'GET',
  handler: notebookCtrls.notebooksList
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
