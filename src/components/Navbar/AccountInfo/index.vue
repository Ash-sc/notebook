<template>
  <div
    class="confirm-popup-bg"
  >
    <div class="confirm-popup-body">
      <h3 class="popup-title txt-ellipsis">
        AccountInfo
      </h3>
      <div class="popup-content">
        <p class="content-p">
          444444
          </p>
      </div>
      <div class="popup-footer">
        <button
          class="btn"
          @click="closeAccountInfo"
        >Cancel</button>
        <button
          class="btn confirm-btn"
          @click="closeAccountInfo"
        >Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    closeAccountInfo: function() {
      this.$parent.hide()
    }
  }
}
</script>

