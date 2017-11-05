import Vue from 'vue'
import apolloClient from '@/apollo'

import {
  usersQuery,
  usersFollowSubs
} from '@/graphql'

const state = {
  users: []
}

const getters = {
  users: (state) => state.users
}

const mutations = {
  SET_USERS (state, users) {
    const object = {}
    users.map((user) => {
      object[user.id] = user
    })
    state.users = object
  },
  ADD_USER (state, user) {
    const object = {}
    object[user.id] = user
    state.users = {...object, ...state.users}
  },
  UPDATE_USER (state, user) {
    Vue.set(state.users, user.id, user)
  },
  DELETE_USER (state, user) {
    Vue.delete(state.users, user.id)
  }
}

const actions = {
  getUsers (context, payload) {
    apolloClient.query({query: usersQuery, variables: payload}).then((result) => {
      context.commit('SET_USERS', result.data.allUsers)
    })
  },
  subscribeToUsersFollow (context, payload) {
    apolloClient.subscribe({
      query: usersFollowSubs,
      variables: payload
    }).subscribe({
      next (data) {
        // then call your store mutation as usual
        switch (data.User.mutation) {
          case 'CREATED':
            context.commit('ADD_USER', data.User.node)
            break
          case 'UPDATED':
            context.commit('UPDATE_USER', data.User.node)
            break
          case 'DELETED':
            context.commit('DELETE_USER', data.User.previousValues)
            break
        }
      },
      error (error) {
        console.log(error)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
