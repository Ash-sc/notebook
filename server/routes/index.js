const authCtrls = require('../controllers/auth')
const noteCtrls = require('../controllers/note')
const notebookCtrls = require('../controllers/notebook')
// const interceptor = require('../middlewares/interceptor')

module.exports = [{
  path: '/note/notesList',
  method: 'GET',
  handler: noteCtrls.notesList
}, {
  path: '/note/notesUpdateList',
  method: 'GET',
  handler: noteCtrls.notesUpdateList
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
  path: '/notebook/deleteNotebook',
  method: 'POST',
  handler: notebookCtrls.deleteNotebook
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
}]
