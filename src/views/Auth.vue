<template>
  <div class="auth">
		<div class="main-body">
		  <div class="container">
        <div v-if="user">
          <strong>User: </strong> {{user}} <br>
          <strong>Token: </strong> {{token}} <br>
          <p>
            <button class="button is-primary" type="button" @click="logout">Logout</button>
          </p>
        </div>
        <div class="auth-body" v-else>
          <div class="tabs is-centered is-fullwidth">
            <ul>
              <router-link tag="li" :to="{name: 'Login'}" exact active-class="is-active">
                <a>Login</a>
              </router-link>
              <router-link tag="li" :to="{name: 'Register'}" exact active-class="is-active">
                <a>Register</a>
              </router-link>
            </ul>
          </div>
          <transition name="fade" appear mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
		</div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  components: {
  },
  data () {
    return {
      user: this.$ls.get('authUser'),
      token: null
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
    }
  },
  mounted () {
    this.token = jwtDecode(this.$ls.get('authToken'))
  },
  methods: {
    logout () {
      this.user = null
      this.$ls.remove('authToken')
      this.$ls.remove('authUser')
    }
  }
}
</script>

<style lang="scss">
	.auth-body{
	  background-color: #f9f9f9;
		max-width: 320px;
		margin-left: auto;
		margin-right: auto;
		padding: 30px 20px;
		margin-top: 10px;
		border: 1px solid #ccc;
		border-radius: 3px;
		box-shadow: 0 2px 3px rgba(#000, 0.1);
	}
</style>
