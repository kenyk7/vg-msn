import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Submit from '@/views/Submit'
import Auth from '@/views/Auth'
import Dash from '@/views/Dash'
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
      path: '/submit',
      name: 'Submit',
      component: Submit
    },
    {
      path: '/dash',
      name: 'Dash',
      component: Dash
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
