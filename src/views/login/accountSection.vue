<template>
  <div class="account-section">
    <div class="sign-up-section">
      <div
        class="title unselected"
        @click="changeSection('signUp')"
      >Create Account</div>
      <div
        class="form-content"
        :class="{ active: activeSection === 'signUp' }"
      >
        <input
          type="text"
          class="form-input btn"
          v-model="formData.userName" maxlength="20"
          placeholder="Username"
        />
        <input
          type="text"
          class="form-input btn"
          v-model="formData.email" maxlength="40"
          placeholder="Email"
        />
        <input
          type="password"
          class="form-input btn"
          v-model="formData.password" maxlength="20"
          placeholder="password"
          @keyup.enter="singUp"
        />
        <button
          class="form-btn btn"
          @click="singUp"
        >Create Account</button>
      </div>
    </div>

    <div class="sign-in-section">
      <div
        class="title unselected"
        @click="changeSection('signIn')"
      >Sign In</div>
      <div
        class="form-content"
        :class="{ active: activeSection === 'signIn' }"
      >
        <input
          type="text"
          class="form-input btn"
          v-model="formData.userName" maxlength="40"
          placeholder="Username"
        />
        <input
          type="password"
          class="form-input btn"
          v-model="formData.password" maxlength="20"
          placeholder="password"
          @keyup.enter="singIn"
        />
        <button
          class="form-btn btn"
          @click="singIn"
        >Sign In</button>
      </div>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/types/accountTypes'

export default {
  data: () => ({
    activeSection: 'signIn',
    formData: {
      userName: '',
      password: ''
    }
  }),
  methods: {
    // 切换登录和注册
    changeSection: function(type) {
      this.formData = {
        userName: '',
        password: '',
        email: ''
      }
      return this.activeSection = type
    },

    // 登录
    singIn: function() {
      const { userName, password } = this.formData
      if (!userName || !password || password.length < 8) return
      this.$store.dispatch(types.USER_SIGN_IN, this.formData)
    },

    // 注册
    singUp: function() {
      const { userName, password } = this.formData
      if (!userName || !password || password.length < 8) return
      this.$store.dispatch(types.USER_SIGN_UP, this.formData)
    }
  }
}
</script>
