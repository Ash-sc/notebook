var authCtrls = require('../controllers/auth'),
  noteCtrls = require('../controllers/note'),
  notebookCtrls = require('../controllers/notebook'),
  interceptor = require('../middlewares/interceptor')

module.exports = [{
  path: '/note/notesList',
  method: 'GET',
  handler: noteCtrls.notesList
}, {
  path: '/note/newNote',
  method: 'POST',
  handler: noteCtrls.newNote
}, {
  path: '/note/saveNote',
  method: 'POST',
  handler: noteCtrls.saveNote
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
  path: '/auth/signUp',
  method: 'POST',
  handler: authCtrls.signUp
}, {
  path: '/auth/login',
  method: 'POST',
  handler: authCtrls.login
}, {
  path: '/auth/logout',
  method: 'DELETE',
  handler: authCtrls.logout
}];
