<template>
  <div class="login has-text-centered">
    <form>
      <div class="field">
        <p class="control">
          <input class="input" name="email" v-model="auth.email" type="email" placeholder="Email">
        </p>
      </div>
      <div class="field">
        <p class="control">
          <input class="input" v-model="auth.password" type="password" placeholder="Password">
        </p>
      </div>
      <p class="has-text-right">
        <button class="button is-primary" type="button" @click="login">Login</button>
      </p>
    </form>
  </div>
</template>

<script>
import { login } from './graph.cool.js'
export default {
  data () {
    return {
      token: null,
      auth: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login () {
      if (!this.auth.email && !this.auth.password) return
      // Mutation
      const email = this.auth.email
      const password = this.auth.password
      this.$apollo.mutate({
        mutation: login,
        variables: {
          email,
          password
        }
      }).then((res) => {
        this.$ls.set('GC_AUTH_TOKEN', res.data.signinUser.token)
        this.$ls.set('GC_AUTH_USER', res.data.signinUser.user)
        this.$toast.open({
          message: 'Login Success',
          type: 'is-success'
        })
        this.$store.commit('setAuth', true)
        this.$router.push({name: 'Home'})
      }).catch((error) => {
        console.error(error)
        this.$toast.open({
          message: 'Error login',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
