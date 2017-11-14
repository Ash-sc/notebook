<template>
  <div class="confirm-popup-body">
    <h3 class="popup-title txt-ellipsis">
      {{ option.title }}
    </h3>
    <div class="popup-content">
      <p class="content-p" v-for="(content, index) in option.tips" :key="index">
        {{ content }}
        </p>
    </div>
    <div class="popup-footer">
      <button
        class="btn"
        @click="cancelFunc"
      >Cancel</button>
      <button
        class="btn confirm-btn"
        @click="confirmFunc"
      >Confirm</button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  },

  methods: {
    // cancel btn
    cancelFunc: function() {
      this.$parent.hide()
    },

    // confirm btn
    confirmFunc: function() {
      this.$emit('confirm-event')
    }
  }

}
</script>

<style lang="scss">
.confirm-popup-body {
  padding: 15px 20px 0 20px;
  width: 100%;
  position: relative;
  background: #ffffff;

  .popup-title {
    margin: 0;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e3e3e3;
  }

  .popup-content {
    padding: 20px 10px;
    text-align: left;
    border-bottom: 1px solid #e3e3e3;

    .content-p {
      font-size: 14px;
      line-height: 20px;
      text-indent: 20px;
      word-break: break-all;
    }

  }

  .popup-footer {
    text-align: right;
    height: 50px;
    line-height: 50px;

    .confirm-btn {
      background-color: #609afc;
      border-color: #609afc;
      color: #ffffff;
    }

  }
}
</style>

