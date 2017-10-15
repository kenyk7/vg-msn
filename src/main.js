// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLocalStorage from 'vue-ls'
import Buefy from 'buefy'
import VueApollo from 'vue-apollo'
import apolloClient from './apollo'

import moment from 'moment'
import vueMoment from 'vue-moment'
// import 'moment/locale/es'

import './scss/default.scss'

// vue moment
Vue.use(vueMoment, { moment })
// Lstorage
Vue.use(VueLocalStorage)
// UI buefy
Vue.use(Buefy, {defaultIconPack: 'fa'})
// Apollo graphql
Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  clients: {
    a: apolloClient
  },
  defaultClient: apolloClient
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  render: h => h(App)
})
