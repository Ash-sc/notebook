import * as types from '../types/notificationTypes'
import moment from 'moment'

// initial state
// shape: [{ id, quantity }]
const state = {
  notificationsArr: [] // loading信息
}

// getters
const getters = {
  notificationsArr: state => state.notificationsArr
}

// actions
const actions = {
  newNotification({ commit, state }, data) {
    commit(types.NEW_NOTIFICATION, { data })
  },
  closeNotification({ commit, state }, id) {
    commit(types.CLOSE_NOTIFICATION, { id })
  }
}

// mutations
const mutations = {
  // 刷新notification
  [types.REFRESH_NOTIFICATION](state) {
    const arr = state.notificationsArr.filter(item => {
      return item.closeTime >= moment().format('x')
    })
    state.notificationsArr = arr
    if (!arr.length) return
    if (arr.length) {
      setTimeout(() => {
        this.commit(types.REFRESH_NOTIFICATION)
      }, 200)
    }
  },
  // 新增notification
  [types.NEW_NOTIFICATION](state, { data }) {
    const newArr = state.notificationsArr.filter(item => {
      return item.closeTime >= moment().format('x')
    })
    newArr.push({
      ...data,
      closeTime: moment().add(300, 's').format('x')
    })
    state.notificationsArr = newArr
    if (newArr.length) {
      this.commit(types.REFRESH_NOTIFICATION)
    }
  },
  // 手动关闭notification
  [types.CLOSE_NOTIFICATION](state, { id }) {
    const newArr = state.notificationsArr
    for (let i = 0; i < newArr.length; i += 1) {
      if (newArr[i].closeTime === id) {
        newArr.splice(i, 1)
        break
      }
    }
    state.notificationsArr = newArr
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
