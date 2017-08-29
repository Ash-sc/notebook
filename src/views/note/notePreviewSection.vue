<template>
  <div class="note-preview-section">
    <div class="top-bar">
      <button
        class="btn"
        v-link="{ path: '/note/all' }"
        v-if="$route.path !== '/note/all'"
      >All Notes</button>
      <span class="current-notebook-name txt-ellipsis">
        {{ $route.path !== '/note/all' ? 'Notebook AAA' : 'All Notes' }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
