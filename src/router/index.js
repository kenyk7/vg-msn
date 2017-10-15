import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Auth from '@/views/Auth'
// Sub
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      redirect: {name: 'Login'},
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
