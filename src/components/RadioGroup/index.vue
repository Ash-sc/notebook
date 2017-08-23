<template>
  <div class="radio-group">
    <span>123123123</span>
  </div>
</template>

<script>

export default {

  props: {
    list: { type: Array, required: true }
  },

  data: () => ({}),

  computed: {

  },
  attached () {
    console.log(this.list)
  }

}
</script>
