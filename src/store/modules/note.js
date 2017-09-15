import * as types from '../types/noteTypes'
import noteService from '@/services/noteService'
import moment from 'moment'

// initial state
// shape: [{ id, quantity }]
const state = {
  noteUpdateInfo: JSON.parse(localStorage.noteUpdateInfo || '[]'), // 笔记更新信息
  notesList: JSON.parse(localStorage.notesList || '[]'), // 笔记详细信息
  currentNote: {} // 当前笔记
}

// getters
const getters = {
  noteUpdateInfo: state => state.noteUpdateInfo,
  notesList: state => state.notesList,
  currentNote: state => state.currentNote
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
    if (data.length) {
      state.currentNote = (() => data[0])()
    }
  },
  [types.GET_NOTE_LIST_FAILURE](state, { data }) {
    state.notesList = []
  },
  [types.UPDATE_CURRENT_NOTE](state, { noteInfo }) {
    state.currentNote = Object.assign(
      state.currentNote,
      noteInfo,
      { updateTime: moment().format('x')}
    )
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
