import api from '../../api/hello'
import * as actionTypes from '../actionTypes'
import * as getterNames from '../getterNames'
import * as mutationTypes from '../mutationTypes'

const state = {
  hello: 'world'
}

const getters = {
  [getterNames.todo]: (state, getters) => (
    state.hello
  )
}

const actions = {
  async [actionTypes.TODO] ({ commit, getters, state }) {
    commit(mutationTypes.TODO, await api.getWorld())
  }
}

const mutations = {
  [mutationTypes.TODO] (state, world) {
    state.hello = world
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}