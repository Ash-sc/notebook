<template>
  <div class="notebooks-list">
    <div
      :class="listBy"
      v-for="notebookInfo in notebooksList"
      :key="notebookInfo.id"
      :style="{top: getIndex(notebookInfo.id) * 51 + 10 + 'px' }"
    >
      <div class="notebook-item">
        <span class="notebook-name txt-ellipsis">{{ notebookInfo.name }}</span><span class="note-num tl-c">{{ notebookInfo.num }}</span>
      </div>
    </div>
  </div>
</template>
<script>

import findIndex from 'lodash/findIndex'
import notebookService from '@/services/notebookService'

export default {

  props: {
    orderType: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      required: true
    }
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
    }
  },

  data: () => ({
    notebooksList: []
  }),

  created: function() {
    notebookService
      .fetchList()
      .then((data) => {
        this.notebooksList = data
      })
  },

  computed: {
    // 排列方式
    listBy: function() {
      return `list-by-${this.listType} notebook-bg`
    }
  }
  
}
</script>
