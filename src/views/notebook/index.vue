<template>
  <!-- 本页为 /notebooks 页面 -->
  <div class="notebook-content">
    <function-bar
      v-on:order-type-change="orderTypeChange"
      v-on:add-new-notebook="addNewNotebook"
    ></function-bar><!-- 顶部工具栏 -->

    <notebooks-list
      :order-type="orderType"
      :notebooks-list="notebooksList"
    ></notebooks-list><!-- 笔记本列表 -->

    <new-notebook
      :show="newNotebook"
      v-on:close-dialog="addNewNotebook"
    ></new-notebook><!-- 新建笔记本弹框 -->
  </div>
</template>

<script>
import FunctionBar from '@/views/notebook/functionBar'
import NotebooksList from '@/views/notebook/notebooksList'
import NewNotebook from './newNotebook'

import notebookService from '@/services/notebookService'

export default {

  components: { FunctionBar, NotebooksList, NewNotebook },

  data: () => ({
    orderType: 'name',
    notebooksList: [],
    newNotebook: false
  }),

  methods: {
    // 获取笔记本列表
    fetchList: function() {
      notebookService
        .fetchList()
        .then((data) => {
          this.notebooksList = data
        })
    },

    // 修改排序方式
    orderTypeChange: function(val) {
      this.orderType = val
    },
    
    // 展开、关闭新建笔记本弹框 type=['true', 'cancel', 'create']
    addNewNotebook: function(type) {
      this.newNotebook = type === 'true'
      // 若为创建后关闭，则刷新列表
      type === 'create' && this.fetchList()
    }
  },

  created: function() {
    // 笔记本列表
    this.fetchList()
  }

}
</script>
