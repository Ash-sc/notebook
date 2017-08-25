<template>
  <!-- 本页为 /note 页面 -->
  <div class="notebook-content">
    <function-bar
      v-on:order-type-change="orderTypeChange"
      v-on:list-type-change="listTypeChange"
    ></function-bar>

    <notebooks-list
      :order-type="orderType"
      :list-type="listType"
    ></notebooks-list>
  </div>
</template>

<script>
import FunctionBar from '@/views/notebook/functionBar'
import NotebooksList from '@/views/notebook/notebooksList'

export default {

  components: { FunctionBar, NotebooksList },

  data: () => ({
    orderType: 'name',
    listType: 'list'
  }),

  methods: {

    orderTypeChange: function(val) {
      this.orderType = val
    },

    listTypeChange: function(val) {
      this.listType = val
    }
  }

}
</script>
