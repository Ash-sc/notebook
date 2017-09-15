<template>
  <!-- 本页为 /notebooks 页面 -->
  <div class="notebook-content">
    <function-bar
      v-on:add-new-notebook="addNewNotebook"
    ></function-bar><!-- 顶部工具栏 -->

    <notebooks-list
      :order-type="$store.state.notebooks.orderType"
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
import * as types from '@/store/types/notebooksTypes'
import { mapGetters } from 'vuex'

export default {

  components: { FunctionBar, NotebooksList, NewNotebook },

  data: () => ({
    newNotebook: false
  }),

  computed: {
    ...mapGetters({
      notebooksList: 'notebooksList'
    })
  },

  methods: {
    // 展开、关闭新建笔记本弹框 type=['true', 'cancel', 'create']
    addNewNotebook: function(type) {
      this.newNotebook = type === 'true'
      // 若为创建后关闭，则刷新列表
      type === 'create' && this.$store.dispatch(types.GET_NOTEBOOKS_LIST)
    }
  },

  created: function() {
    // 笔记本列表
    if (!this.$store.state.notebooks.notebooksList.length) {
      this.$store.dispatch(types.GET_NOTEBOOKS_LIST)
    }
  }

}
</script>
