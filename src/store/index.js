import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './gerters'
import mutations from './mutations'
import state from './status'
// 日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 测试 开发环境
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})