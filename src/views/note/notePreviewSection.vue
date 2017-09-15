<template>
  <div class="note-preview-section">
    <div class="top-bar">
      <router-link
        to="/note/all"
        v-if="$route.path !== '/note/all'"
      >
        <button
          class="btn"
        >All Notes</button>
      </router-link>
      <span class="current-notebook-name txt-ellipsis">
        {{ $route.path !== '/note/all' ?
          `Notebook : ${currentNotebook}`
            : 'All Notes'
        }}
      </span>
    </div>
    <div class="note-card-preview">
      <note-preview-card
        v-for="(note, $index) in notesList"
        :note-info="note"
        :key="$index"
        :active="$index === 2"
      >
      </note-preview-card>
    </div>
  </div>
</template>
<script>
import find from 'lodash/find'
import { mapGetters } from 'vuex'
import NotePreviewCard from './notePreviewCard'

export default {
  components: { NotePreviewCard },

  computed: {
    currentNotebook: function() {
      const obj = find(this.$store.state.notebooks.notebooksList, { id: this.$route.params.notebookId }) || {}
      return obj.name ? obj.name : ''
    },
    ...mapGetters({
      notesList: 'notesList'
    })
  }
}
</script>
