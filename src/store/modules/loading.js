import * as types from '../types/loadingTypes'
// import findIndex from 'lodash/findIndex'

// initial state
// shape: [{ id, quantity }]
const state = {
  loading: {} // loading信息
}

// getters
const getters = {
  loading: state => state.loading
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.LOADING_CHANGE](state, { data }) {
    if (data.status) {
      state.push(data.path)
    } else {
      state.splice(state[state.indexOf(data.path)], 1, 0)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
