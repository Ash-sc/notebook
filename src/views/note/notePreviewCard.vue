<template>
  <div
    class="note-preview-card txt-ellipsis"
    :class="{ 'active-note': active }"
    @click="changeActiveNote"
  >
    {{noteInfo.title}}
    <span class="fa fa-chevron-circle-down"></span>
  </div>
</template>
<script>
import * as types from '@/store/types/noteTypes'

export default {
  props: {
    noteInfo: {
      type: Object,
      default: {}
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    changeActiveNote: function() {
      this.$store.commit(types.CHANGE_ACTIVE_NOTE, { noteInfo: this.noteInfo })
    }
  }
}
</script>
