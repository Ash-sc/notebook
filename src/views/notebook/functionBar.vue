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

    <radio-group
      :list="layoutTypes"
      class="layout-types"
      :selected-value="layoutType"
      v-on:change-value="listTypeChange"
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
    orderType: 'name',
    layoutTypes: [
      { label: '', value: 'icon', classList: 'fa fa-th-large' },
      { label: '', value: 'list', classList: 'fa fa-bars' }
    ],
    layoutType: 'list'
  }),
  methods: {
    orderTypeChange: function(val) {
      this.$emit('order-type-change', val)
    },
    listTypeChange: function(val) {
      this.$emit('list-type-change', val)
    },
    addNewNotebook: function() {
      this.$emit('add-new-notebook', 'true')
    }
  }
}
</script>
