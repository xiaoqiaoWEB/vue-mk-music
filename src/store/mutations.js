import * as type from './mutations-types'

const mutations = {
  [type.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations