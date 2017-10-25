<template>
  <div class="notebooks-list">
    <div
      class="notebook-bg"
      v-for="notebookInfo in notebooksList"
      :key="notebookInfo.id"
      :style="{top: getIndex(notebookInfo.id) * 51 + 10 + 'px' }"
      @dblclick="goNotePage(notebookInfo.id)"
      @contextmenu.prevent="notebookOpt(notebookInfo)"
    >
      <div class="notebook-item">
        <span class="notebook-name txt-ellipsis">{{ notebookInfo.name }}</span><span
          class="note-num tl-c"
          @mouseenter="hoverNotebookItem(notebookInfo.id)"
          @mouseleave="hoverNotebookItem"
        >
          {{ getNoteNum(notebookInfo.id) }}
          <span
            class="delete-notebook fa fa-trash-o"
            :class="{ 'delete-notebook-show': hoverNotebookId === notebookInfo.id }"
            @click="deleteConfirm(notebookInfo)"
          ></span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>

import findIndex from 'lodash/findIndex'
import { mapGetters } from 'vuex'
import * as noteTypes from '@/store/types/noteTypes'
import * as notebooksTypes from '@/store/types/notebooksTypes'
import * as popupTypes from '@/store/types/popupTypes'

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

  data: () =>({
    hoverNotebookId: '',
    tobeDelId: ''
  }),

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
      this.$store.commit(noteTypes.CHANGE_ACTIVE_NOTE, { noteInfo })
      this.$router.replace(`/note/${id}`)
    },

    // 获取笔记数量
    getNoteNum(notebookId) {
      return this.notesList.filter(note => note.notebookId === notebookId).length
    },

    // 右键事件 todo
    notebookOpt(info) {
      console.log('right click event. todo//')
    },

    // 鼠标悬停笔记数量部分，显示删除按钮
    hoverNotebookItem(id = '') {
      this.hoverNotebookId = id
    },

    // 删除笔记本二次确认
    deleteConfirm(info) {
      this.tobeDelId = info.id
      this.$store.commit(popupTypes.NEW_POPUP, {
        title: 'Delete Confirm',
        tips: [
          'Delete Notebook will also delete the notes belongs to this notebook, and it would be unrecoverable.',
          'Delete anyway ?'
        ],
        callback: this.deleteNotebookReq
      })
    },

    // 删除笔记请求部分
    deleteNotebookReq() {
      this.$store.dispatch(notebooksTypes.DELETE_NOTEBOOK, this.tobeDelId)
    }
  }
  
}
</script>
