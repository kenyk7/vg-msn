import Vue from 'vue'
import Vuex from 'vuex'

import apolloClient from './../apollo'

import { photosHome, photosHomeSus, profileInfo } from './../apollo/queries'

Vue.use(Vuex)
const DEBUG = process.env.NODE_ENV === 'development'

let photosSubscriptionObserver

const state = {
  profile: {},
  photos: []
}

const getters = {
  photos: state => state.photos
}

const mutations = {
  SET_PROFILE (state, data) {
    state.profile = data
  },
  SET_PHOTOS (state, photos) {
    // having an object instead of an array makes the other methods easier
    // since we can use Vue.set() and Vue.delete()
    const object = {}
    photos.map((photo) => {
      object[photo.id] = photo
    })
    state.photos = object
  },
  ADD_PHOTO (state, photo) {
    Vue.set(state.photos, photo.id, photo)
  },
  UPDATE_PHOTO (state, photo) {
    Vue.set(state.photos, photo.id, photo)
  },
  DELETE_PHOTO (state, photo) {
    Vue.delete(state.photos, photo.id)
  }
}

const actions = {
  getProfile (context, payload) {
    apolloClient.query({query: profileInfo, variables: payload}).then((result) => {
      context.commit('SET_PROFILE', result.data.User)
    })
  },
  getPhotos (context, payload) {
    apolloClient.query({query: photosHome, variables: payload}).then((result) => {
      context.commit('SET_PHOTOS', result.data.allPhotos)
    })
  },
  subscribeToPhotos (context, payload) {
    photosSubscriptionObserver = apolloClient.subscribe({
      query: photosHomeSus,
      variables: payload
    }).subscribe({
      next (data) {
        // mutation will say the type of GraphQL mutation `CREATED`, `UPDATED` or `DELETED`
        console.log(data.Photo.mutation)
        // node is the actual data of the result of the GraphQL mutation
        console.log(data.Photo)
        // then call your store mutation as usual
        switch (data.Photo.mutation) {
          case 'CREATED':
            context.commit('ADD_PHOTO', data.Photo.node)
            break
          case 'UPDATED':
            context.commit('UPDATE_PHOTO', data.Photo.node)
            break
          case 'DELETED':
            context.commit('DELETE_PHOTO', data.Photo.previousValues)
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
