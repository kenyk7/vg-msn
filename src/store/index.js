import Vue from 'vue'
import Vuex from 'vuex'

import apolloClient from './../apollo'

import {
  postsHome,
  postsHomeSus,
  profileInfo,
  usersQuery
} from './../apollo/queries'

Vue.use(Vuex)
const DEBUG = process.env.NODE_ENV === 'development'

let photosSubscriptionObserver

const state = {
  profile: {},
  posts: [],
  users: []
}

const getters = {
  posts: state => state.posts
}

const mutations = {
  SET_PROFILE (state, data) {
    state.profile = data
  },
  SET_POSTS (state, posts) {
    // having an object instead of an array makes the other methods easier
    // since we can use Vue.set() and Vue.delete()
    const object = {}
    posts.map((post) => {
      object[post.id] = post
    })
    state.posts = object
  },
  SET_USERS (state, users) {
    const object = {}
    users.map((user) => {
      object[user.id] = user
    })
    state.users = object
  },
  ADD_POST (state, post) {
    Vue.set(state.posts, post.id, post)
  },
  UPDATE_POST (state, post) {
    Vue.set(state.posts, post.id, post)
  },
  DELETE_POST (state, post) {
    Vue.delete(state.posts, post.id)
  }
}

const actions = {
  getProfile (context, payload) {
    apolloClient.query({query: profileInfo, variables: payload}).then((result) => {
      context.commit('SET_PROFILE', result.data.User)
    })
  },
  getUsers (context, payload) {
    apolloClient.query({query: usersQuery, variables: payload}).then((result) => {
      context.commit('SET_USERS', result.data.allUsers)
    })
  },
  getPosts (context, payload) {
    apolloClient.query({query: postsHome, variables: payload}).then((result) => {
      context.commit('SET_POSTS', result.data.allPosts)
    })
  },
  subscribeToPosts (context, payload) {
    photosSubscriptionObserver = apolloClient.subscribe({
      query: postsHomeSus,
      variables: payload
    }).subscribe({
      next (data) {
        // mutation will say the type of GraphQL mutation `CREATED`, `UPDATED` or `DELETED`
        console.log(data.Post.mutation)
        // node is the actual data of the result of the GraphQL mutation
        console.log(data.Post)
        // then call your store mutation as usual
        switch (data.Post.mutation) {
          case 'CREATED':
            context.commit('ADD_POST', data.Post.node)
            break
          case 'UPDATED':
            context.commit('UPDATE_POST', data.Post.node)
            break
          case 'DELETED':
            context.commit('DELETE_POST', data.Post.previousValues)
            break
        }
      },
      error (error) {
        console.log(error)
      }
    })
  },
  // You call this action to stop the subscription
  unsubscribeFromPhotos (context) {
    if (photosSubscriptionObserver) {
      photosSubscriptionObserver.unsubscribe()
      photosSubscriptionObserver = null
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: DEBUG
})
