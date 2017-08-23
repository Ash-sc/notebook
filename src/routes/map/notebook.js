export default {
  '/notebooks': {
    
    // 基页
    title: '笔记本',
    icon: 'fa fa-commenting-o',
    showInNavbar: true,
    showInSidebar: true,
    component (resolve) {
      require(['@/views/notebook'], resolve)
    }

  }
}
