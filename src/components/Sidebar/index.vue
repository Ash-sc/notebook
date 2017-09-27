<template>
  <div>
    <p
      class="recent-notes-title"
      v-show="recentNote.length > 0"
    >Recent Notes</p>
    <ul
      class="recent-notes"
      v-show="recentNote.length > 0"
    >
      <li
        class="note-link"
        v-for="(note, index) in recentNote"
        :key="index"
        :class="{ active: isNoteActive(note) }"
      >
        <a
          class="link-a"
          @click="linkToRecentNote(note)"
        >{{note.title}}</a>
      </li>
    </ul>
    <ul class="menu-list">
      <li class="menu-link">
        <a
          class="vlink notes-link"
          :class="{ active: $route.path.indexOf('/note/') === 0}"
          @click="linkToTag"
        >Notes</a>
      </li>
      <li class="menu-link">
        <router-link
          class="vlink notebooks-link"
          :class="{ active: $route.path.indexOf('/notebooks') === 0}"
          to="/notebooks"
        >
          Notebooks
        </router-link>
      </li>
      <li class="menu-link">
        <router-link
          class="vlink tags-link"
          :class="{ active: $route.path.indexOf('/tags') === 0}"
          to="/tags"
        >
          Tags
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import * as types from '@/store/types/noteTypes'
import { mapGetters } from 'vuex'

export default {

  methods: {
    // 跳转至所有note页面
    linkToTag: function() {
      this.$store.commit(types.CHANGE_ACTIVE_NOTE, {
        noteInfo: this.notesList.length ? this.notesList[0] : {}
      })
      this.$router.replace('/note/all')
    },
    // 跳转至指定note页面
    linkToRecentNote: function(noteInfo) {
      this.$store.commit(types.CHANGE_ACTIVE_NOTE, { noteInfo })
      this.$router.replace(`/note/${noteInfo.notebookId}`)
    },
    // note是否为当前note
    isNoteActive: function(noteInfo) {
      const currentNote = this.$store.state.note.currentNote
      return this.$route.path.indexOf(`/note/${noteInfo.notebookId}`) === 0 && noteInfo.id === currentNote.id
    }
  },
  computed: {
    recentNote: function() {
      const noteList = this.$store.state.note.notesList
      return noteList.length ? noteList.slice(0, 5) : []
    },

    ...mapGetters({
      notesList: 'notesList'
    })
  }
}
</script>
