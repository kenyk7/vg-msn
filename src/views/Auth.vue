<template>
  <div class="pag-auth">
    <section class="hero is-medium" style="background-image: url(https://picsum.photos/1500/500?random)">
      <div class="hero-body">
      </div>
    </section>
		<div class="main-body">
		  <div class="container">
        <div v-if="user" class="pag-profile">
          <div class="user-caption">
            <div class="user-caption__img">
              <img src="https://placeimg.com/250/250/people" :alt="profile.username"  width="150">
            </div>
            <h2 class="title is-2">@{{profile.username}}</h2>
          </div>
          <div class="pag-profile__tags">
            <b-field grouped group-multiline>
              <div class="control">
                <b-taglist attached>
                  <b-tag type="is-dark">
                    Posts
                  </b-tag>
                  <b-tag type="is-success">{{profile._postsMeta.count}}</b-tag>
                </b-taglist>
              </div>
              <div class="control">
                <b-taglist attached>
                  <b-tag type="is-dark">
                    Likes
                  </b-tag>
                  <b-tag type="is-success">
                    {{profile._likesMeta.count}}
                  </b-tag>
                </b-taglist>
              </div>
            </b-field>
          </div>
          <br>
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
  computed: {
    user () {
      return this.$store.state.userAuth
    },
    profile () {
      return this.$store.state.profile
    }
  },
  mounted () {
    this.token = jwtDecode(this.$ls.get('authToken'))
  },
  methods: {
    logout () {
      this.$store.commit('setAuth', false)
      this.$store.commit('setUserAuth', null)
      this.$ls.remove('authToken')
      this.$ls.remove('authUser')
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
.pag-profile{
  margin-top: -125px;
  text-align: center;
  margin-bottom: 1rem;
  &__tags{
    .field{
      justify-content: center;
    }
  }
}
.user-caption{
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__img{
    img{
      border: 4px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 3px rgba(#000, 0.1);
    }
  }
}
</style>
