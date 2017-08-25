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
    notebooksList: [
      { name: '默认', id: '1', num: 1, lastUpdateTime: '1503634764388' },
      { name: '服务器', id: '2', num: 0, lastUpdateTime: '1503644764288' },
      { name: '前端', id: '3', num: 1, lastUpdateTime: '1503644724388' },
      { name: '后端', id: '4', num: 2, lastUpdateTime: '1503644764388' }
    ]
  }),

  computed: {
    listBy: function() {
      return `list-by-${this.listType} notebook-bg`
    }
  }
  
}
</script>
