import * as types from '../types/notebooksTypes'
import * as noteTypes from '../types/noteTypes'
import notebookService from '@/services/notebookService'

// initial state
// shape: [{ id, quantity }]
const state = {
  orderType: 'name',
  notebooksList: JSON.parse(localStorage.notebooksList || '[]')
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
  // 获取笔记本列表
  [types.GET_NOTEBOOKS_LIST]({ commit, state }) {
    // commit(types.GET_NOTEBOOKS_LIST_REQUEST)
    notebookService
    .fetchList()
    .then((data) => {
      commit(types.GET_NOTEBOOKS_LIST_SUCCESS, { data })
      localStorage.notebooksList = JSON.stringify(data)
    }, () => {
      commit(types.GET_NOTEBOOKS_LIST_FAILURE)
    })
  },

  [types.DELETE_NOTEBOOK]({ commit, state }, notebookId) {
    notebookService
    .deleteNotebook(notebookId)
    .then(() => {
      this.dispatch(types.GET_NOTEBOOKS_LIST)
      this.dispatch(noteTypes.GET_NOTE_UPDATE_LIST)
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
