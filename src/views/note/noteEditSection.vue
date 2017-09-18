<template>
  <div class="note-edit-section">
    <span
      class="fa fa-floppy-o save-note"
      @click="saveNote"
    ></span>
    <input
      type="text"
      class="note-title-input"
      placeholder="Untitled"
      maxlength="40"
      v-model="currentNote.title"
      @change="changeNoteTitle"
    />
    <vue-html5-editor
      :content="currentNote.content"
      @change="changeNoteContent"
    ></vue-html5-editor>
  </div>
</template>
<script>
import VueHtml5Editor from 'vue-html5-editor'
import Vue from 'vue'
import isEmpty from 'lodash/isEmpty'
import * as types from '@/store/types/noteTypes'
import moment from 'moment'

Vue.use(VueHtml5Editor, {
  showModuleName: false,
  image: {
    sizeLimit: 512 * 1024,
    compress: true,
    width: 500,
    height: 500,
    quality: 80
  },
  visibleModules: [
    'text',
    'color',
    'font',
    'align',
    'list',
    'link',
    'unlink',
    'tabulation',
    'image',
    'hr',
    'eraser',
    'undo',
    'full-screen'
  ]
})

export default {
  props: {
    noteInfo: {
      type: Object,
      default: {}
    }
  },

  computed: {
    currentNote: function() {
      return !isEmpty(this.noteInfo) ? JSON.parse(JSON.stringify(this.noteInfo)) : {}
    }
  },

  methods: {
    // 修改笔记内容
    changeNoteTitle: function(e) {
      const title = e.target.value
      this.$store.commit(types.UPDATE_CURRENT_NOTE, { noteInfo: { title } })
    },

    // 修改笔记内容
    changeNoteContent: function(content) {
      this.$store.commit(types.UPDATE_CURRENT_NOTE, { noteInfo: { content } })
    },

    // 保存笔记
    saveNote() {
      const noteInfo = Object.assign({}, this.currentNote, { updateTime: moment().format('x') })
      this.$store.dispatch(types.SAVE_NOTE, noteInfo)
    }
  }
}
</script>
