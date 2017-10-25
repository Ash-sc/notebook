<template>
  <div class="search-components-bg">
    <input
      type="text"
      class="btn search-btn"
      placeholder="Search notes"
      @focus="toggleResultList('show')"
      @blur="toggleResultList('hide')"
      v-model="keyWords"
    />
    <i
      class="fa fa-times-circle clear-key-words"
      v-show="keyWords"
      @click="clearKeyWords"
    ></i>
    <div class="result-list" v-show="showResultList && keyWords">
      <label
        class="sub-title"
      >notes</label>
      <ul class="result-ul">
        <li
          class="result-li txt-ellipsis"
          v-for="(item, index) in resultData.notes"
          :key="index"
          @click="jumpToNote(item)"
        >{{ item.title }}</li>
        <li
          class="result-li txt-ellipsis no-result"
          v-show="!resultData.notes.length"
        >no result</li>
      </ul>

      <label
        class="sub-title"
      >notebooks</label>
      <ul class="result-ul">
        <li
          class="result-li txt-ellipsis"
          v-for="(item, index) in resultData.notebooks"
          :key="index"
          @click="jumpToNotebook(item)"
        >{{ item.name }}</li>
        <li
          class="result-li txt-ellipsis no-result"
          v-show="!resultData.notebooks.length"
        >no result</li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as noteTypes from '@/store/types/noteTypes'

export default {

  data: () => ({
    showResultList: false,
    keyWords: '',
    resultData: {
      notes: {},
      notebooks: {}
    }
  }),

  methods: {
    // 显示、隐藏搜索结果
    toggleResultList: function(type) {
      if (type === 'show') {
        this.showResultList = true
      } else {
        setTimeout(function() {
          this.showResultList = false
        }.bind(this), 100)
      }
    },

    // 清空搜索信息
    clearKeyWords: function() {
      this.keyWords = ''
    },

    // 跳转到笔记
    jumpToNote: function(noteInfo) {
      this.$store.commit(noteTypes.CHANGE_ACTIVE_NOTE, { noteInfo })
      this.$router.replace('/note/' + noteInfo.notebookId)
    },

    // 跳转到笔记本
    jumpToNotebook: function(info) {
      this.$router.replace('/note/' + info.id)
    }
  },

  watch: {
    // 监听搜索框变化
    keyWords: function(value) {
      if (value === '') {
        this.resultData = {
          notes: {},
          notebooks: {}
        }
      } else {
        this.resultData = {
          notes: this.$store.state.note.notesList.filter((info) =>
            info.title.indexOf(value) >= 0 || info.content.indexOf(value) >= 0
          ),
          notebooks: this.$store.state.notebooks.notebooksList.filter((info) =>
            info.name.indexOf(value) >= 0
          )
        }
      }
    }
  }
}
</script>
<style lang="scss">
.search-components-bg {
  display: inline-block;
  width: 300px;
  position: relative;

  .search-btn {
    text-align: center;
    cursor: inherit;
    width: 100%;
    background-color: #fff;
  }

  .search-btn:active {
    box-shadow: inset 0 1px 1px rgba(0,0,0,.1);
  }

  .search-btn {
    vertical-align: top;
  }

  .clear-key-words {
    font-size: 12px;
    position: absolute;
    right: 4px;
    top: 4px;
    cursor: pointer;
  }

  .result-list {
    position: absolute;
    width: 100%;
    max-height: 200px;
    top: 25px;
    z-index: 1500;
    text-align: left;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
  }

  .result-ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
  }

  .sub-title {
    display: block;
    font-size: 13px;
    line-height: 20px;
    font-weight: bold;
    text-indent: 5px;
    margin: 0;
  }

  .sub-title:not(first-child) {
    border-top: 1px solid #d2d2d2;
  }

  .result-li {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
    user-select: none;
  }

  .result-li:not(.no-result):hover {
    background-color: #2992de;
    color: #fff;
    cursor: default;
  }
}
</style>
