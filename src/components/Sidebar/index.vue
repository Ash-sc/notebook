<template>
  <div>
    <p class="recent-notes-title">Recent Notes</p>
    <ul class="recent-notes">
      <li class="note-link">note name here...</li>
      <li class="note-link">note name here...</li>
      <li class="note-link">note name here...</li>
    </ul>
    <ul class="menu-list">
      <li class="menu-link">
        <a
          class="vlink notes-link"
          :class="{ active: $route.path.indexOf('/note/') === 0}"
          @click="linkToTag"
        >Notes</a>
      </li>
      <li class="menu-link">
        <router-link
          class="vlink notebooks-link"
          :class="{ active: $route.path.indexOf('/notebooks') === 0}"
          to="/notebooks"
        >
          Notebooks
        </router-link>
      </li>
      <li class="menu-link">
        <router-link
          class="vlink tags-link"
          :class="{ active: $route.path.indexOf('/tags') === 0}"
          to="/tags"
        >
          Tags
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    linkToTag: function() {
      this.$router.replace('/note/all')
    }
  }
}
</script>
