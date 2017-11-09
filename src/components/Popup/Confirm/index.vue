<template>
  <div
    class="confirm-popup-bg"
    :class="{ 'confirm-popup-show': $store.state.popup.show }"
  >
    <div class="confirm-popup-body">
      <h3 class="popup-title txt-ellipsis">
        {{ $store.state.popup.option.title }}
      </h3>
      <div class="popup-content">
        <p class="content-p" v-for="(content, index) in $store.state.popup.option.tips" :key="index">
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
  </div>
</template>

<script>
import * as types from '@/store/types/popupTypes'

export default {
  
  methods: {
    // cancel btn
    cancelFunc: function() {
      this.$store.commit(types.CLOSE_POPUP, {
        type: 'cancel'
      })
    },

    // confirm btn
    confirmFunc: function() {
      this.$store.commit(types.CLOSE_POPUP, {
        type: 'success'
      })
    }
  }

}
</script>
