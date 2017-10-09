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
    <p class="account-info-p">Account Info...</p>
    <p
      class="log-out-p"
      @click="logout"
    >Log Out</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      accountInfo: 'accountInfo'
    })
  },
  methods: {
    logout: function() {
      this.$emit('close-account-option')
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

