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
import * as types from '@/store/types/notebooksTypes'

export default {

  components: { RadioGroup },

  data: () => ({
    orderTypes: [
      { label: 'Name', value: 'name' },
      { label: 'Count', value: 'count' },
      { label: 'Updated', value: 'updated' }
    ]
  }),

  computed: {
     orderType() {
       return this.$store.state.notebooks.orderType
     }
  },

  methods: {
    orderTypeChange: function(val) {
      this.$store.commit(types.CHANGE_ORDER_TYPE, { type: val })
    },
    addNewNotebook: function() {
      this.$emit('add-new-notebook', 'true')
    }
  }
}
</script>
