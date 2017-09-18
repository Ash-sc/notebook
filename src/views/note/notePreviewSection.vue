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
      <div
        class="note-preview-card txt-ellipsis add-new-note"
        @click="addNewNote"
      >
        + Add New Note
      </div>
      <note-preview-card
        v-for="(note, $index) in noteListFilter"
        :note-info="note"
        :key="$index"
        :active="note.id === currentNote.id"
      >
      </note-preview-card>
    </div>
  </div>
</template>
<script>
import find from 'lodash/find'
import { mapGetters } from 'vuex'
import NotePreviewCard from './notePreviewCard'
import * as types from '@/store/types/noteTypes'

export default {
  components: { NotePreviewCard },

  data: function() {
    const notebookId = this.$route.params.notebookId
    return {
      currentNoteBookId: notebookId === 'all' ? '' : notebookId
    }
  },

  computed: {
    currentNotebook: function() {
      const obj = find(this.$store.state.notebooks.notebooksList, { id: this.$route.params.notebookId }) || {}
      return obj.name ? obj.name : ''
    },
    ...mapGetters({
      notesList: 'notesList',
      currentNote: 'currentNote'
    }),
    noteListFilter: function() {
      
      const arr = this.currentNoteBookId ? this.notesList.filter((item) => {
        return item.notebookId === this.currentNoteBookId
      }) : this.notesList
      if (!this.$store.state.note.currentNote.id) {
        this.$store.commit(types.CHANGE_ACTIVE_NOTE, {
          noteInfo: arr.length ? arr[0] : {}
        })
      }
      return arr
    }
  },

  methods: {
    addNewNote: function() {
      console.log(1233)
    }
  }
}
</script>
