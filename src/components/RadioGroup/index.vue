<template>
  <div class="radio-group">
    <div v-for="(item, $index) in list" :key="item.value" class="radio-item">
      <input
        type="radio"
        :value="item.value"
        :id=" item.label + '-' + item.value "
        :name="'radio-group' + random"
        v-model="currentSelectedval"
        class="hide"
        @click="typeChange(item.value)"
      />
      <label
        :for="item.label + '-' + item.value"
        class="radio-label"
        :class="{
          'radio-label-last': $index === list.length - 1,
          'radio-label-first': $index === 0,
          'radio-label-active': currentSelectedval === item.value,
          [item.classList]: item.classList
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
      type: String,
      default: ''
    }
  },

  data: function() {
    return {
      random: Math.floor(Math.random * 1000),
      currentSelectedval: this.selectedValue
    }
  },

  methods: {
    typeChange: function(val) {
      val !== this.selectedValue && this.$emit('change-value', val)
    }
  },
  attached () {
    if (this.currentSelectedval === '' && this.list.length) this.currentSelectedval = this.list[0].value
  }

}
</script>
