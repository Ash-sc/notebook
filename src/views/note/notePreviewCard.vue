<template>
  <div
    class="note-preview-card txt-ellipsis"
    :class="{ 'active-note': active }"
  >
    {{noteInfo.title}}
    <span class="fa fa-chevron-circle-down"></span>
  </div>
</template>
<script>

export default {
  props: {
    noteInfo: {
      type: Object,
      default: {}
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
