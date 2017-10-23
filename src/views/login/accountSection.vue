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
          :class="{'error-input': errorMsg.userName}"
          v-model="formData.userName" maxlength="12"
          placeholder="User Name"
        />
        <span class="error-tips">{{errorMsg.userName}}</span>
        <input
          type="text"
          class="form-input btn"
          v-model="formData.email" maxlength="40"
          :class="{'error-input': errorMsg.email}"
          placeholder="Email"
        />
        <span class="error-tips">{{errorMsg.email}}</span>
        <input
          type="text"
          class="form-input btn"
          v-model="formData.password" maxlength="20"
          placeholder="password (8-20 bits)"
          :class="{'error-input': errorMsg.password}"
          @keyup.enter="singUp"
        />
        <span class="error-tips">{{errorMsg.password}}</span>
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
          v-model="formData.userName" maxlength="12"
          placeholder="User Name"
          :class="{'error-input': errorMsg.userName}"
        />
        <span class="error-tips">{{errorMsg.userName}}</span>
        <input
          type="password"
          class="form-input btn"
          v-model="formData.password" maxlength="20"
          placeholder="password"
          :class="{'error-input': errorMsg.password}"
          @keyup.enter="singIn"
        />
        <span class="error-tips">{{errorMsg.password}}</span>
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
import * as accountValidate from '@/validate/account'
import isEmpty from 'lodash/isEmpty'

export default {
  data: () => ({
    activeSection: 'signIn',
    formData: {
      userName: '',
      password: '',
        email: ''
    },
    errorMsg: {}
  }),
  methods: {
    // 切换登录和注册
    changeSection: function(type) {
      this.formData = {
        userName: '',
        password: '',
        email: ''
      }
      this.errorMsg = {}
      return this.activeSection = type
    },

    // 表单格式校验
    validateCheck: function(...arg) {
      arg.forEach(function(type) {
        const str = accountValidate[`${type}Format`](this.formData[type])
        if (str) {
          this.errorMsg = {...this.errorMsg, ...{ [type]: str }}
        } else {
          delete this.errorMsg[type]
          this.errorMsg = {...this.errorMsg}
        }
      }.bind(this))
    },

    // 登录
    singIn: function() {
      this.validateCheck('userName', 'password')
      if (!isEmpty(this.errorMsg)) return
      return this.$store.dispatch(types.USER_SIGN_IN, this.formData)
    },

    // 注册
    singUp: function() {
      this.validateCheck('userName', 'email', 'password')
      if (!isEmpty(this.errorMsg)) return
      return this.$store.dispatch(types.USER_SIGN_UP, this.formData)
    }
  }
}
</script>
