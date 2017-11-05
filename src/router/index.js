import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Auth from '@/views/Auth'
import Profile from '@/views/Profile'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth,
      beforeEnter: (to, from, next) => {
        if (Vue.ls.get('GC_AUTH_USER')) {
          next({name: 'Home'})
        }
        next()
      }
    }
  ]
})

// http://router.vuejs.org/en/advanced/meta.html
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!Vue.ls.get('GC_AUTH_USER')) {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
