<template>
  <div class="auth">
    <nav class="nav has-shadow">
		  <div class="container">
		    <div class="nav-center">
		    	<router-link class="nav-item is-tab" :to="{name: 'Login'}" exact active-class="is-active">
	          Login
	        </router-link>
	        <router-link class="nav-item is-tab" :to="{name: 'Register'}" exact active-class="is-active">
	          Register
	        </router-link>
		    </div>
		  </div>
		</nav>
		<div class="main-body">
		  <div class="container">
        <div v-if="user">
          <strong>Username: </strong> {{user.username}} <br>
          <strong>Email: </strong> {{user.email}} <br>
          <strong>Token: </strong> {{token}} <br>
          <strong>userAPI: </strong> {{User}} <br>
          <p>
            <button class="button is-primary" type="button" @click="logout">Logout</button>
          </p>
        </div>
        <div class="auth-body" v-else>
          <transition name="fade" appear mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <pre>{{profile}}</pre>
      </div>
		</div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { getUserId } from './auth/graph.cool.js'

export default {
  components: {
  },
  data () {
    return {
      msg: 'Welcome to Auth',
      user: this.$ls.get('authUser'),
      token: null,
      User: {}
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
    }
  },
  // Apollo-specific options
  apollo: {
    // Query with parameters
    User: {
      // gql query
      query: getUserId,
      variables: {
        id: 'cj30lemolmddd0167rwtbtk1s'
      }
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
