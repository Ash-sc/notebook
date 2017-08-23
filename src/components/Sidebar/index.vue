<template>
  <div>
    <p class="recent-notes-title">Recent Notes</p>
    <ul class="recent-notes">
      <li class="note-link">note name here</li>
      <li class="note-link">note name here</li>
      <li class="note-link">note name here</li>
    </ul>
    <ul class="menu-list">
      <li class="menu-link">
        <a class="vlink" v-link="{path:'/notes'}">Notes</a>
      </li>
      <li class="menu-link">
        <a class="vlink" v-link="{path:'/notebooks'}">Notebooks</a>
        </li>
      <li class="menu-link">
        <a class="vlink"  v-link="{path:'/tags'}">Tags</a>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
}
</script>
