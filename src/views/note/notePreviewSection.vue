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
        {{ $route.path !== '/note/all' ? 'Notebook AAA' : 'All Notes' }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
