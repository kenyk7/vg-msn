<template>
  <div class="pag-auth">
    <section class="hero is-medium" style="background-image: url(https://picsum.photos/1500/500?random)">
      <div class="hero-body">
      </div>
    </section>
		<div class="main-body">
		  <div class="container">
        <div class="auth-body">
          <div class="tabs is-centered is-fullwidth">
            <ul>
              <li :class="{'is-active': isLogin}">
                <a @click="isLogin = true">Login</a>
              </li>
              <li :class="{'is-active': !isLogin}">
                <a @click="isLogin = false">Register</a>
              </li>
            </ul>
          </div>
          <transition name="fade" appear mode="out-in">
            <auth-login v-if="isLogin"></auth-login>
            <auth-register v-else></auth-register>
          </transition>
        </div>
      </div>
		</div>
  </div>
</template>

<script>
import authLogin from './auth/Login.vue'
import authRegister from './auth/Register.vue'
export default {
  components: {
    authLogin,
    authRegister
  },
  data () {
    return {
      isLogin: true
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    const _self = this
    if (this.user) {
      _self.$router.push({name: 'Home'})
    }
  }
}
</script>
<style lang="scss" scoped>
.pag-auth{
  .hero{
    background-position: center center;
  }
}
.auth-body{
  background-color: #f9f9f9;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 20px;
  margin-top: -100px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 2px 3px rgba(#000, 0.1);
}
</style>
