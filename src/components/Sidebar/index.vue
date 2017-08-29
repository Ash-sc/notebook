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
        <a
          class="vlink notebooks-link"
          v-link="{ path: '/notebooks', activeClass: 'active' }"
        >Notebooks</a>
        </li>
      <li class="menu-link">
        <a
          class="vlink tags-link"
          v-link="{ path:'/tags', activeClass: 'active' }"
        >Tags</a>
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
