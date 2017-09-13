<template>
  <div class="funcion-bar">
    <button
      class="btn add-new-notebook"
      @click="addNewNotebook"
    >New Notebook</button>

    <radio-group
      :list="orderTypes"
      class="order-types"
      :selected-value="orderType"
      v-on:change-value="orderTypeChange"
    ></radio-group>
  </div>
</template>
<script>
import RadioGroup from '@/components/RadioGroup'

export default {

  components: { RadioGroup },

  data: () => ({
    orderTypes: [
      { label: 'Name', value: 'name' },
      { label: 'Count', value: 'count' },
      { label: 'Updated', value: 'updated' }
    ],
    orderType: 'name'
  }),
  methods: {
    orderTypeChange: function(val) {
      console.log(this.$store)
      this.$emit('order-type-change', val)
    },
    addNewNotebook: function() {
      this.$emit('add-new-notebook', 'true')
    }
  }
}
</script>
