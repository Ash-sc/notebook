<template>
  <!-- 本页为 /note/list 页面 -->
  <div class="note-list-page">
    <note-preview-section
    ></note-preview-section>
    <note-edit-section
    :note-info="$store.state.note.currentNote"
    ></note-edit-section>
  </div>
</template>
<script>

import NotePreviewSection from './notePreviewSection'
import NoteEditSection from './noteEditSection'
import * as notebooksTypes from '@/store/types/notebooksTypes'
import * as noteTypes from '@/store/types/noteTypes'

export default {

  components: { NotePreviewSection, NoteEditSection },

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
