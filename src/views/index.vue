<template>
  <div>
    <req-loading></req-loading>
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
import Navbar from '@/components/Navbar/'
import Sidebar from '@/components/Sidebar/'
import Breadcrumb from '@/components/Breadcrumb'
import * as notebooksTypes from '@/store/types/notebooksTypes'
import * as noteTypes from '@/store/types/noteTypes'
import ReqLoading from '@/components/ReqLoading/'

export default {
  // 路由会自动将该组件挂载到 #app 上
  // el: () => '#app',

  components: {
    Navbar,
    Sidebar,
    Breadcrumb,
    ReqLoading
  },

  // 注意：顶级变量必须设置默认值方能引入 observer
  data: () => ({
    userData: null
  }),

  created: function() {
    if (!localStorage.accountInfo) {
      return false
    }
    // 获取笔记本列表
    this.$store.dispatch(notebooksTypes.GET_NOTEBOOKS_LIST)

    // 缓存中没有笔记列表 👉 则向后端请求笔记列表, 否则获取笔记更新列表
    if (!this.$store.state.note.notesList.length) {
      this.$store.dispatch(noteTypes.GET_NOTE_LIST)
    } else {
      // 笔记更新列表
      this.$store.dispatch(noteTypes.GET_NOTE_UPDATE_LIST)
    }
  }
}
</script>


<style>
</style>
