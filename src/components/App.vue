<template>
  <div>
    <navbar></navbar>
  
    <div class="main-content">
      <div class="left-menu">
        <sidebar></sidebar>
      </div>
      <div class="right-content">
        <router-view transition="fade" transition-mode="out-in"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
/* 根组件就像是 AngularJS 的 $rootScope，同时也负责全局布局 */
import Navbar from '@/components/Navbar/'
import Sidebar from '@/components/Sidebar/'
import Breadcrumb from '@/components/Breadcrumb'
import * as notebooksTypes from '@/store/types/notebooksTypes'
import * as noteTypes from '@/store/types/noteTypes'

export default {
  // 路由会自动将该组件挂载到 #app 上
  // el: () => '#app',
  
  components: { Navbar, Sidebar, Breadcrumb },

  // 注意：顶级变量必须设置默认值方能引入 observer
  data: () => ({
    userData: null
  }),

  created: function() {
    // 缓存中没有笔记本列表 👉 则向后端请求获取笔记本列表
    if (!this.$store.state.notebooks.notebooksList.length && this.$route.path !== '/note/all') {
      this.$store.dispatch(notebooksTypes.GET_NOTEBOOKS_LIST)
    }

    // 缓存中没有笔记列表 👉 则向后端请求笔记列表
    if (!this.$store.state.note.notesList.length) {
      this.$store.dispatch(noteTypes.GET_NOTE_LIST)
    }
  }
}
</script>
