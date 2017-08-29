export default {
  '/note': {
    
    // 基页
    title: '笔记',
    showInNavbar: true,
    showInSidebar: true,
    component (resolve) {
      require(['@/views/note'], resolve)
    },

    // 子路由
    subRoutes: {
      '/:notebookId': {
        title: '列表',
        component (resolve) {
          require(['@/views/note/list'], resolve)
        }
      }
      // '/edit/:noteId': {
      //   title: '详情',
      //   icon: 'fa fa-search-plus',
      //   component (resolve) {
      //     require(['@/views/note/detail'], resolve)
      //   }
      // }
    }

  }
}
