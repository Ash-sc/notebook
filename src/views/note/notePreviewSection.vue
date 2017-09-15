<template>
  <div class="note-preview-section">
    <div class="top-bar">
      <router-link
        to="/note/all"
        v-if="$route.path !== '/note/all'"
      >
        <button
          class="btn"
        >All Notes</button>
      </router-link>
      <span class="current-notebook-name txt-ellipsis">
        {{ $route.path !== '/note/all' ?
          `Notebook : ${currentNotebook}`
            : 'All Notes'
        }}
      </span>
    </div>
    <div class="note-item-preview">
      123
    </div>
  </div>
</template>
<script>
import find from 'lodash/find'

export default {
  computed: {
    currentNotebook: function() {
      const obj = find(this.$store.state.notebooks.notebooksList, { id: this.$route.params.notebookId }) || {}
      return obj.name ? obj.name : ''
    }
  }
}
</script>
