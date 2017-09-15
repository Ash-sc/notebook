<template>
  <div class="note-edit-section">
    <input
      type="text"
      class="note-title-input"
      placeholder="Untitled"
      maxlength="40"
      v-model="currentNote.title"
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
// import { mapGetters } from 'vuex'

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
    changeNoteContent: function(content) {
      console.log(123123, content)
    }
  }
}
</script>
