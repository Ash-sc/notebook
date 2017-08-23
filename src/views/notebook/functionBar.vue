<template>
  <div class="funcion-bar">
    <button class="btn add-new-notebook">New Notebook</button>
    <radio-group list="showTypes"></radio-group>
  </div>
</template>
<script>
import RadioGroup from '@/components/RadioGroup'

export default {

  components: { RadioGroup },

  data: () => ({
    showTypes: ['Name', 'Count', 'Updated']
  })
}
</script>
