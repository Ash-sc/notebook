import * as types from '../types/noteTypes'
import noteService from '@/services/noteService'

// initial state
// shape: [{ id, quantity }]
const state = {
  notesList: JSON.parse(localStorage.notesList || '[]')
}

// getters
const getters = {
  notesList: state => state.notesList
}

// actions
const actions = {
  [types.GET_NOTE_LIST]({ commit, state }) {
    // commit(types.GET_NOTEBOOKS_LIST_REQUEST)
    noteService
    .fetchList()
    .then((data) => {
      commit(types.GET_NOTE_LIST_SUCCESS, { data })
    }, () => {
      commit(types.GET_NOTE_LIST_FAILURE)
    })
  }
}

// mutations
const mutations = {
  [types.GET_NOTE_LIST_SUCCESS](state, { data }) {
    state.notesList = data
  },
  [types.GET_NOTE_LIST_FAILURE](state, { data }) {
    state.notesList = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
