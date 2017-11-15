<template>
  <div class="account-info-body">
    <section class="image-and-operate">
      <div class="user-image-div">
        <img class="user-image" src="http://oxjejkjw8.bkt.clouddn.com/image/dog.jpg" alt="user-image" />
      </div>
      <p class="user-name">{{ accountInfo.userName }}</p>
      <p class="user-email">{{ accountInfo.email }}</p>
      <section class="operate-section">
        <button class="btn" @click="logout">Log Out</button>
        <button class="btn" @click="close">close</button>
      </section>
    </section>

    <section class="account-info-section">
      <h3 class="title">Account Info</h3>
      <div class="form-item">
        <label class="form-label">User Name:</label>
        <span class="form-content">{{ accountInfo.userName }}</span>
      </div>
      <div class="form-item">
        <label class="form-label">Nick Name:</label>
        <input type="text" v-model="accountInfo.userName" class="form-control" maxlength="10" />
      </div>
      <div class="form-item">
        <label class="form-label">Phone:</label>
        <input type="text" v-model="accountInfo.phoneNum" class="form-control" maxlength="11" />
      </div>
      <div class="form-item">
        <label class="form-label">Introduction:</label>
        <textarea v-model="accountInfo.introduction" class="form-control" rows="4"></textarea>
      </div>
    </section>
  </div>
</template>

<script>
import * as types from '@/store/types/accountTypes'

export default {
  data: () => ({
    accountInfo: JSON.parse(localStorage.accountInfo)
  }),

  methods: {
    close: function() {
      this.$parent.hide()
    },

    logout: function() {
      this.$store.dispatch(types.USER_LOG_OUT)
    }
  }
}
</script>

