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
      user: this.$ls.get('authUser')
    }
  },
  created () {
    const _self = this
    if (this.user) {
      _self.$store.commit('setAuth', true)
      _self.$store.commit('setUserAuth', _self.user)
      _self.$store.dispatch('getUsers', {userAuth: _self.user.id})
      _self.$store.dispatch('getProfile', {userAuth: _self.user.id})
      _self.$store.dispatch('getPosts', {userAuth: _self.user.id})
      // subscribe entities
      _self.$store.dispatch('subscribeToPosts', {userAuth: _self.user.id})
      _self.$store.dispatch('subscribeToUsersFollow', {userAuth: _self.user.id})
      _self.$store.dispatch('subscribeToUserAuth', {userAuth: _self.user.id})
    } else {
      _self.$router.push({name: 'Auth'})
    }
  }
}
</script>

<style>
  .main-body{
    padding: 30px 0;
  }
  .container{
    width: 80%;
    margin: 0 auto;
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
