<template>
  <div class="new-notebook" :style="{ display: show ? 'block' : 'none' }">
    <p>new notebook here!</p>
  </div>
</template>
<script>

export default {

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  methods: {
  },

  data: () => ({
  })
  
}
</script>
