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

export default {

  components: { NotePreviewSection, NoteEditSection }

}
</script>
