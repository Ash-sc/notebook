import * as types from '../types/notebooksTypes'
import notebookService from '@/services/notebookService'

// initial state
// shape: [{ id, quantity }]
const state = {
  orderType: 'name',
  notebooksList: []
}

// getters
const getters = {
  notebooksList: state => state.notebooksList
}

// actions
const actions = {
  // checkout ({ commit, state }, products) {
  //   const savedCartItems = [...state.added]
  //   commit(types.CHECKOUT_REQUEST)
  //   shop.buyProducts(
  //     products,
  //     () => commit(types.CHECKOUT_SUCCESS),
  //     () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
  //   )
  // }
  [types.GET_NOTEBOOKS_LIST]({ commit, state }) {
    // commit(types.GET_NOTEBOOKS_LIST_REQUEST)
    notebookService
    .fetchList()
    .then((data) => {
      commit(types.GET_NOTEBOOKS_LIST_SUCCESS, { data })
    }, () => {
      commit(types.GET_NOTEBOOKS_LIST_FAILURE)
    })
  }
}

// mutations
const mutations = {
  [types.CHANGE_ORDER_TYPE](state, { type }) {
    state.orderType = type
  },
  [types.GET_NOTEBOOKS_LIST_FAILURE](state) {
    state.notebooksList = []
  },
  [types.GET_NOTEBOOKS_LIST_SUCCESS](state, { data }) {
    state.notebooksList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
