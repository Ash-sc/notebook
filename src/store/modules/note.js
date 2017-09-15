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
  // 获取笔记列表
  [types.GET_NOTE_LIST]({ commit, state }) {
    noteService
    .fetchList()
    .then((data) => {
      commit(types.GET_NOTE_LIST_SUCCESS, { data })
    }, () => {
      commit(types.GET_NOTE_LIST_FAILURE)
    })
  },

  // 保存笔记
  [types.SAVE_NOTE]({ commit, state }, noteInfo) {
    noteService
    .saveNote(noteInfo)
    .then((data) => {
      console.log('save note success!')
    }, () => {
      console.log('save note error!')
    })
  }
}

// mutations
const mutations = {
  [types.GET_NOTE_LIST_SUCCESS](state, { data }) {
    state.notesList = data
    if (data.length) {
      state.currentNote = Object.assign({}, data[0])
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
  },
  // 切换当前显示的笔记
  [types.CHANGE_ACTIVE_NOTE](state, { noteInfo }) {
    state.currentNote = noteInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
