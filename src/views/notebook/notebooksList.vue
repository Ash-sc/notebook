<template>
  <div class="notebooks-list">
    <div
      class="notebook-bg"
      v-for="notebookInfo in notebooksList"
      :key="notebookInfo.id"
      :style="{top: getIndex(notebookInfo.id) * 51 + 10 + 'px' }"
      @dblclick="goNotePage(notebookInfo.id)"
    >
      <div class="notebook-item">
        <span class="notebook-name txt-ellipsis">{{ notebookInfo.name }}</span><span class="note-num tl-c">{{ getNoteNum(notebookInfo.id) }}</span>
      </div>
    </div>
  </div>
</template>
<script>

import findIndex from 'lodash/findIndex'
import { mapGetters } from 'vuex'
import * as types from '@/store/types/noteTypes'

export default {


  props: {
    orderType: {
      type: String,
      default: ''
    },
    notebooksList: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      notesList: 'notesList'
    })
  },

  methods: {
    // index用于计算偏移量，为排序动画做准备
    getIndex: function(id) {
      const arr = JSON.parse(JSON.stringify(this.notebooksList))
      switch (this.orderType) {
        case 'name':
          arr.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'count':
          arr.sort((a, b) => a.num < b.num)
          break
        case 'updated':
          arr.sort((a, b) => a.lastUpdateTime < b.lastUpdateTime)
          break
        default:
          break
      }
      return findIndex(arr, { id })
    },

    // 路由跳转至具体笔记本，查看笔记
    goNotePage: function(id) {
      const noteList = this.notesList
        .filter(note => note.notebookId === id)
        .sort((a, b) => a.updateTime < b.updateTime)
      const noteInfo = noteList.length ? noteList[0] : {}
      this.$store.commit(types.CHANGE_ACTIVE_NOTE, { noteInfo })
      this.$router.replace(`/note/${id}`)
    },

    // 获取笔记数量
    getNoteNum(notebookId) {
      return this.notesList.filter(note => note.notebookId === notebookId).length
    }
  }
  
}
</script>
