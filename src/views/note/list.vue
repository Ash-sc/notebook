<template>
  <!-- 本页为 /note/list 页面 -->
  <div class="note-list-page">
    <note-preview-section
    ></note-preview-section>
  </div>
</template>
<script>

import NotePreviewSection from './notePreviewSection'
import * as notebooksTypes from '@/store/types/notebooksTypes'

export default {

  components: { NotePreviewSection },

  created: function() {
    if (!this.$store.state.notebooks.notebooksList.length && this.$route.path !== '/note/all') {
      this.$store.dispatch(notebooksTypes.GET_NOTEBOOKS_LIST)
    }
  }

}
</script>
