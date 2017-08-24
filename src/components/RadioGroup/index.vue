<template>
  <div class="radio-group">
    <div v-for="item in list" :key="item.value" class="radio-item">
      <input
        type="radio"
        value="{{ item.value }}"
        id="{{ item.label + '-' + item.value }}"
        name="{{ 'radio-group' + random }}"
        v-model="selectedValue"
        class="hide"
      />
      <label
        for="{{ item.label + '-' + item.value }}"
        class="radio-label"
        :class="{
          'radio-label-last': $index === list.length - 1,
          'radio-label-first': $index === 0,
          'radio-label-active': selectedValue === item.value
        }"
      >
        {{ item.label }}
      </label>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    list: { type: Array, required: true },
    selectedValue: {
      default: ''
    }
  },

  data: () => ({
    random: Math.floor(Math.random * 1000)
  }),

  computed: {

  },
  attached () {
    console.log(this.list, this.selectedValue)
    if (this.selectedValue === '' && this.list.length) this.selectedValue = this.list[0].value
  }

}
</script>
