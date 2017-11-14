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
    <vue-popup ref="newNotebookDialog">
      <new-notebook></new-notebook>
    </vue-popup>
  </div>
</template>

<script>
import FunctionBar from '@/views/notebook/functionBar'
import NotebooksList from '@/views/notebook/notebooksList'
import NewNotebook from './newNotebook'
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
    // 展开新建笔记本弹框
    addNewNotebook: function() {
      this.$refs.newNotebookDialog.show()
    }
  }

}
</script>
