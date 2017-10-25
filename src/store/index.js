import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import account from './modules/account'
import loading from './modules/loading'
import notification from './modules/notification'
import popup from './modules/popup'
import notebooks from './modules/notebooks'
import note from './modules/note'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    loading,
    notification,
    popup,
    account,
    notebooks,
    note
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
