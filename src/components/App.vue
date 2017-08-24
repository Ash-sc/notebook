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

export default {
  // 路由会自动将该组件挂载到 #app 上
  // el: () => '#app',
  
  components: { Navbar, Sidebar, Breadcrumb },

  // 注意：顶级变量必须设置默认值方能引入 observer
  data: () => ({
    userData: null
  })
}
</script>
