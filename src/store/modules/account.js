import * as types from '../types/accountTypes'
import * as noteTypes from '../types/noteTypes'
import * as notebooksTypes from '../types/notebooksTypes'
import accountService from '@/services/accountService'
import router from '@/routes/'

// initial state
const state = {
  accountInfo: JSON.parse(localStorage.accountInfo || '{}') // account信息
}

// getters
const getters = {
  accountInfo: state => state.accountInfo,
  showAccountSetting: state => state.showAccountSetting
}

const Notification = function(type, content) {
  this.dispatch('newNotification', {
    type,
    content
  })
}

// actions
const actions = {
  // 用户登录
  [types.USER_SIGN_IN]({ commit, state }, formData) {
    accountService
    .login(formData)
    .then((data) => {
      Notification.call(this, 'success', 'Welcome!')
      this.dispatch(noteTypes.GET_NOTE_LIST)
      this.dispatch(notebooksTypes.GET_NOTEBOOKS_LIST)
      commit(types.CHANGE_ACCOUNT_INFO, { data })
      router.push('/notebooks')
    }, (err) => {
      Notification.call(this, 'error', err.errorMsg)
      commit(types.CHANGE_ACCOUNT_INFO, { data: {} })
    })
  },

  // 用户注册
  [types.USER_SIGN_UP]({ commit, state }, formData) {
    accountService
    .signUp(formData)
    .then((data) => {
      Notification.call(this, 'success', 'Welcome!')
      this.dispatch(noteTypes.GET_NOTE_LIST)
      this.dispatch(notebooksTypes.GET_NOTEBOOKS_LIST)
      commit(types.CHANGE_ACCOUNT_INFO, { data })
      router.push('/notebooks')
    }, (err) => {
      Notification.call(this, 'error', err.errorMsg)
      commit(types.CHANGE_ACCOUNT_INFO, { data: {} })
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
