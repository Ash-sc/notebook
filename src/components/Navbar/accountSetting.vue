<template>
  <div class="account-setting">
    <div class="image-and-name">
      <img
        class="account-iamge"
        src="http://oxjejkjw8.bkt.clouddn.com/image/dog.jpg"
        alt="img"
      />
      <span
        class="txt-ellipsis account-name-span"
      >{{accountInfo.userName}}</span>
    </div>
    <p class="account-info-p" @click="showAccountInfo">Account Info...</p>
    <p
      class="log-out-p"
      @click="logout"
    >Log Out</p>
    <div class="account-setting-bg" @click="closeOption"></div>
    <vue-popup ref="accountInfoDialog">
      <account-info></account-info>
    </vue-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountInfo from './AccountInfo/'
import * as types from '@/store/types/accountTypes'

export default {
  components: { AccountInfo },

  computed: {
    ...mapGetters({
      accountInfo: 'accountInfo'
    })
  },
  methods: {
    closeOption: function() {
      this.$emit('close-account-option')
    },

    showAccountInfo: function () {
      this.$refs.accountInfoDialog.show()
    },

    logout: function() {
      this.closeOption()
      this.$store.dispatch(types.USER_LOG_OUT)
    }
  }
}
</script>

