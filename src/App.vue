<template>
  <div>
    <header-app></header-app>
    <transition name="fade" appear mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import HeaderApp from './components/Header.vue'
export default {
  components: {
    HeaderApp
  },
  data () {
    return {
      userLs: this.$ls.get('GC_AUTH_USER')
    }
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  created () {
    const _self = this
    if (this.userLs) {
      _self.$store.commit('setAuth', true)
    } else {
      _self.$store.commit('setAuth', false)
    }
  },
  methods: {
    getAllData () {
      const _self = this
      const userLs = this.$ls.get('GC_AUTH_USER')
      const payload = {
        userAuth: userLs.id,
        after: null
      }
      _self.$store.dispatch('getUser', payload)
      _self.$store.dispatch('getUsers', payload)
      _self.$store.dispatch('getPosts', payload)
      _self.$store.dispatch('getMyPosts', payload)
      _self.$store.dispatch('getMyPostsLikes', payload)
      // subscribe entities
      _self.$store.dispatch('subscribeToPosts', payload)
      _self.$store.dispatch('subscribeToUsersFollow', payload)
      _self.$store.dispatch('subscribeToUserAuth', payload)
    }
  },
  watch: {
    isAuth (to, from) {
      const _self = this
      if (to) {
        _self.getAllData()
      }
    }
  }
}
</script>

<style>
  .main-body{
    padding: 30px 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to{
    opacity: 0;
    transform: scale(0.9);
  }
</style>
