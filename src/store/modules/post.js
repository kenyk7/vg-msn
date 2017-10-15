import Vue from 'vue'
import apolloClient from '@/apollo'

import {
  postsHome,
  postsHomeSubs
} from '@/graphql'

let postsSubscriptionObserver

const state = {
  posts: []
}

const mutations = {
  SET_POSTS (state, posts) {
    // having an object instead of an array makes the other methods easier
    // since we can use Vue.set() and Vue.delete()
    const object = {}
    posts.map((post) => {
      object[post.id] = post
    })
    state.posts = object
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
  getPosts (context, payload) {
    apolloClient.query({query: postsHome, variables: payload}).then((result) => {
      context.commit('SET_POSTS', result.data.allPosts)
    })
  },
  subscribeToPosts (context, payload) {
    postsSubscriptionObserver = apolloClient.subscribe({
      query: postsHomeSubs,
      variables: payload
    }).subscribe({
      next (data) {
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
  unsubscribeFromPosts (context) {
    if (postsSubscriptionObserver) {
      postsSubscriptionObserver.unsubscribe()
      postsSubscriptionObserver = null
    }
  }
}

export default {
  state,
  // getters,
  mutations,
  actions
}