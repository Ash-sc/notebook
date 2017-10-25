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
        v-for="(note, $index) in noteListFilter()"
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

  computed: {
    currentNotebook: function() {
      const obj = find(this.$store.state.notebooks.notebooksList, { id: this.$route.params.notebookId }) || {}
      return obj.name ? obj.name : ''
    },
    ...mapGetters({
      notesList: 'notesList',
      currentNote: 'currentNote',
      notebooksList: 'notebooksList'
    })
  },

  methods: {
    // 新建笔记
    addNewNote: function() {
      const notebookId = this.$route.params.notebookId.replace(/^all$/, '')
      if (!this.notebooksList.length) {
        this.$store.dispatch('newNotification', {
          type: 'error',
          content: 'Sorry, please create a notebook first.'
        })
        return
      } else if (notebookId && !find(this.notebooksList, { id: notebookId })) {
        this.$store.dispatch('newNotification', {
          type: 'error',
          content: 'Error notebookId.'
        })
        return
      }
      const noteInfo = {
        notebookId: notebookId
          ? notebookId : this.notebooksList[0].id
      }
      this.$store.dispatch(types.CREATE_NEW_NOTE, noteInfo)
    },

    // 笔记本过滤
    noteListFilter: function() {
      const notebookId = this.$route.params.notebookId
      const currentNoteBookId = notebookId === 'all' ? '' : notebookId
      
      const arr = currentNoteBookId
        ? this.notesList.filter((item) => {
          return item.notebookId === currentNoteBookId
        }) : this.notesList

      if (!this.$store.state.note.currentNote.id && arr.length) {
        this.$store.commit(types.CHANGE_ACTIVE_NOTE, {
          noteInfo: arr.length ? arr[0] : {}
        })
      }
      return arr
    }
  }
}
</script>
