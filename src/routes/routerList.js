export default [
  { 
    path: '/',
    component (resolve) {
      require(['@/views/'], resolve)
    },
    redirect: to => {
      return '/notebooks'
    }
  },
  { 
    path: '/notebooks',
    component (resolve) {
      require(['@/views/notebook'], resolve)
    }
  },
  { 
    path: '/note',
    component (resolve) {
      require(['@/views/note'], resolve)
    },
    children: [
      {
        path: '/note/:notebookId',
        component (resolve) {
          require(['@/views/note/list'], resolve)
        }
      }
    ]
  }
]
