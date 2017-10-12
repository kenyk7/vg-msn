<template>
  <div class="login has-text-centered">
    <h3 class="title is-4">{{msg}}</h3>
    <form @submit.prevent="createUser">
      <div class="field">
        <p class="control">
          <input class="input" name="username" v-model="auth.username" type="text" placeholder="Username">
        </p>
      </div>
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
        <button class="button is-primary" type="submit">Register</button>
      </p>
    </form>
  </div>
</template>

<script>
import { createAndLoginUser } from './graph.cool.js'
export default {
  data () {
    return {
      msg: 'Register',
      auth: {
        username: 'kenyk7',
        email: null,
        password: 'secret123'
      }
    }
  },
  methods: {
    createUser () {
      if (!this.auth.email && !this.auth.password) return
      // Mutation
      const _self = this
      const email = this.auth.email
      const username = this.auth.username
      const password = this.auth.password
      this.$apollo.mutate({
        mutation: createAndLoginUser,
        variables: {
          username,
          email,
          password
        }
      }).then((res) => {
        // Result
        console.log('created user', res)
        this.$toast.open({
          message: 'User create and login success',
          type: 'is-success'
        })
        this.$ls.set('authToken', res.data.signinUser.token)
        this.$ls.set('authUser', res.data.signinUser.user)
        setTimeout(() => {
          _self.$router.push({name: 'Hello'})
        }, 3000)
      }).catch((error) => {
        // Error
        console.error(error)
        this.$toast.open({
          message: 'Error User exists',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
