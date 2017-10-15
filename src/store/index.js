import Vue from 'vue'
import Vuex from 'vuex'
import apolloClient from '@/apollo'

import post from './modules/post'
import user from './modules/user'

import {
  profileInfo,
  userAuthSubs
} from '@/graphql'

Vue.use(Vuex)
const DEBUG = process.env.NODE_ENV === 'development'

const state = {
  isAuth: false,
  userAuth: null,
  profile: {}
}

const getters = {
  profile: state => state.profile
}

const mutations = {
  setAuth (state, data) {
    state.isAuth = data
  },
  setUserAuth (state, user) {
    state.userAuth = user
  },
  SET_PROFILE (state, user) {
    state.profile = user
  }
}

const actions = {
  getProfile (context, payload) {
    apolloClient.query({query: profileInfo, variables: payload}).then((result) => {
      context.commit('SET_PROFILE', result.data.User)
    })
  },
  subscribeToUserAuth (context, payload) {
    apolloClient.subscribe({
      query: userAuthSubs,
      variables: payload
    }).subscribe({
      next (data) {
        // mutation will say the type of GraphQL mutation `CREATED`, `UPDATED` or `DELETED`
        console.log(data.User.mutation)
        // node is the actual data of the result of the GraphQL mutation
        console.log(data.User)
        // then call your store mutation as usual
        switch (data.User.mutation) {
          case 'UPDATED':
            context.commit('SET_PROFILE', data.User.node)
            break
        }
      },
      error (error) {
        console.log(error)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    post,
    user
  },
  strict: DEBUG
})
