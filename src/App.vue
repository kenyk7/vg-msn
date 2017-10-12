<template>
  <div>
    <header-app>
      <span slot="title">Yunga Photografy</span>
      <span slot="subtitle">Santa Rosa - Jaén</span>
    </header-app>
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
    this.$store.dispatch('getProfile', {userId: this.user.id})
    this.$store.dispatch('getPhotos', {userAuth: this.user.id})
    this.$store.dispatch('subscribeToPhotos', {userAuth: this.user.id})
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
