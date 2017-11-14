<template>
  <div
    class="note-preview-card txt-ellipsis"
    :class="{ 'active-note': active }"
    @click="changeActiveNote"
  >
    {{noteInfo.title}}
    <span
      class="fa fa-chevron-circle-right"
      @mouseenter="toggleDeleteIcon(true)"
      @mouseleave="toggleDeleteIcon(false)"
    >
      <span
        class="fa fa-trash-o delete-note"
        :class="{'delete-note-show': showDeleteIcon }"
        @click="deleteConfirm"
      ></span>
    </span>
    <vue-popup ref="deleteNoteDialog" :options="{ width: 505 }">
      <confirm :option="deleteNoteOpt" v-on:confirm-event="deleteNoteReq"></confirm>
    </vue-popup>
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

  data: () => ({
    showDeleteIcon: false,
    deleteNoteOpt: {
      title: 'Delete Confirm',
      tips: [
        'Delete this note ? it would be unrecoverable.',
        'Are you sure ?'
      ]
    }
  }),

  methods: {
    // 切换高亮
    changeActiveNote: function() {
      this.$store.commit(types.CHANGE_ACTIVE_NOTE, { noteInfo: this.noteInfo })
    },

    // 显示、隐藏删除按钮
    toggleDeleteIcon: function(type) {
      this.showDeleteIcon = type
    },

    // 删除笔记req
    deleteNoteReq: function() {
      this.$refs.deleteNoteDialog.hide()
      if (this.active) {
        this.$store.commit(types.CHANGE_ACTIVE_NOTE, { noteInfo: {} })
      }
      this.$store.dispatch(types.DELETE_NOTE, this.noteInfo.id)
    },

    // 删除笔记弹框
    deleteConfirm: function() {
      this.$refs.deleteNoteDialog.show()
    }
  }
}
</script>
