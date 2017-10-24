import * as types from '../types/popupTypes'

const defaultCallback = function() {
  console.error('callback function is needed !')
}

const state = {
  show: false, // 是否显示
  option: {
    title: 'Confirm',
    tips: [''],
    callback: defaultCallback
  }
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  // 显示模态框
  [types.NEW_POPUP](state, { title, tips, callback }) {
    state.show = true
    state.option = {
      title,
      tips,
      callback
    }
  },
  // 关闭模态框
  [types.CLOSE_POPUP](state, { type }) {
    state.show = false
    if (type === 'success') {
      state.option.callback()
    }
    state.option.callback = defaultCallback
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
