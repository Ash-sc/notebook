<template>
  <div class="funcion-bar">
    <button class="btn add-new-notebook">New Notebook</button>
    <radio-group :list="orderTypes" class="order-types" :selected-value="orderType"></radio-group>
    <radio-group :list="layoutTypes" class="layout-types" :selected-value="layoutType"></radio-group>
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
      { label: 'icon', value: 'icon' },
      { label: 'list', value: 'list' }
    ],
    layoutType: 'list'
  })
}
</script>
