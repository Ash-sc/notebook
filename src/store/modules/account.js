import * as types from '../types/accountTypes'
import * as noteTypes from '../types/noteTypes'
import * as notebooksTypes from '../types/notebooksTypes'
import accountService from '@/services/accountService'
import router from '@/routes/'
import md5 from 'crypto-js/md5'
import Vue from 'vue'

// initial state
const state = {
  accountInfo: JSON.parse(localStorage.accountInfo || '{}') // account信息
}

// getters
const getters = {
  accountInfo: state => state.accountInfo,
  showAccountSetting: state => state.showAccountSetting
}

const dealData = function(formData) {
  const obj = Object.assign({}, formData)
  obj.password = md5(obj.password).toString()
  return obj
}

// actions
const actions = {
  // 用户登录
  [types.USER_SIGN_IN]({ commit, state }, formData) {
    accountService
    .login(dealData(formData))
    .then((data) => {
      Vue.prototype.$Message.success('Welcome!')
      this.dispatch(noteTypes.GET_NOTE_LIST)
      this.dispatch(notebooksTypes.GET_NOTEBOOKS_LIST)
      commit(types.CHANGE_ACCOUNT_INFO, { data })
      router.push('/notebooks')
    }, (err) => {
      Vue.prototype.$Message.error(err.errorMsg)
      commit(types.CHANGE_ACCOUNT_INFO, { data: {} })
    })
  },

  // 用户注册
  [types.USER_SIGN_UP]({ commit, state }, formData) {
    accountService
    .signUp(dealData(formData))
    .then((data) => {
      Vue.prototype.$Message.success('Welcome!')
      this.dispatch(noteTypes.GET_NOTE_LIST)
      this.dispatch(notebooksTypes.GET_NOTEBOOKS_LIST)
      commit(types.CHANGE_ACCOUNT_INFO, { data })
      router.push('/notebooks')
    }, (err) => {
      Vue.prototype.$Message.err(err.errorMsg)
      commit(types.CHANGE_ACCOUNT_INFO, { data: {} })
    })
  },

  // 用户登出
  [types.USER_LOG_OUT]({ commit, state }) {
    accountService
      .logout()
      .then(() => {
        localStorage.clear()
        router.push('/login')
      })
  }
}

// mutations
const mutations = {
  // 修改用户信息
  [types.CHANGE_ACCOUNT_INFO](state, { data }) {
    state.accountInfo = data
    localStorage.accountInfo = JSON.stringify(data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
