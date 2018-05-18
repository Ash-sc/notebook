<template>
  <div class="new-notebook-body">
    <h3 class="title">Create New Notebook</h3>
    <input
      type="text"
      class="notebook-name"
      v-model="notebookName"
      placeholder="Notebook name"
      maxlength="30"
      @keyup.enter="newNotebook"
      id="notebook-name"
    /><!--笔记本名称-->
    <label for="notebook-name" class="fa fa-book"></label>
    <div class="notebook-type">
      <!--笔记本类型-->
      <p class="tips">This notebook is:</p>
      <input
        type="radio"
        value="private"
        name="notebook-type-radio"
        id="private-notebook"
        v-model="notebookType"
      />
      <label for="private-notebook">Private</label>
      <input
        type="radio"
        value="shared"
        name="notebook-type-radio"
        id="shared-notebook"
        v-model="notebookType"
      />
      <label for="shared-notebook">Shared</label>
    </div>

    <div class="submit-and-cancel">
      <button
        class="btn"
        @click="closeDialog"
      >Cancel</button>
      <button
        class="btn"
        :class="{ disable: !notebookName}"
        @click="newNotebook"
      >Create</button>
    </div>
  </div>
</template>
<script>

import notebookService from '@/services/notebookService'
import * as types from '@/store/types/notebooksTypes'

export default {

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    notebookName: '',
    notebookType: 'shared'
  }),

  methods: {
    // 关闭弹框
    closeDialog: function() {
      this.$parent.hide()
    },
    // 新建
    newNotebook: function() {
      if (!this.notebookName) {
        $.toast({ heading: 'error', text: 'Notebook name is required！', icon: 'error' })
        return false
      }
      notebookService
        .newNotebook({ notebookName: this.notebookName, notebookType: this.notebookType })
        .then(() => {
          // 关闭窗口
          this.closeDialog()
          this.$store.dispatch(types.GET_NOTEBOOKS_LIST)
        })
    }
  }

}
</script>
