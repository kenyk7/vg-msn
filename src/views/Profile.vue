<template>
  <div class="pag-profile">
    <section class="hero is-medium is-m" style="background-image: url(https://picsum.photos/1500/500?random)">
      <div class="hero-body">
      </div>
    </section>
    <div class="main-body">
      <div class="container">
        <div class="pag-profile__body">
          <div class="user-caption">
            <div class="user-caption__img">
              <img :src="'https://via.placeholder.com/250x250?text=@' + user.username" :alt="user.username"  width="150">
            </div>
            <h2 class="title is-2">@{{user.username}}</h2>
            <p>{{user.email}}</p>
          </div>
          <div class="pag-profile__tags">
            <b-field grouped group-multiline>
              <div class="control">
                <b-taglist attached>
                  <b-tag type="is-dark">
                    Posts
                  </b-tag>
                  <b-tag type="is-success">{{user._postsMeta.count}}</b-tag>
                </b-taglist>
              </div>
              <div class="control">
                <b-taglist attached>
                  <b-tag type="is-dark">
                    Likes
                  </b-tag>
                  <b-tag type="is-success">
                    {{user._likesMeta.count}}
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
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    this.token = jwtDecode(this.$ls.get('GC_AUTH_TOKEN'))
  },
  methods: {
    logout () {
      this.$store.commit('setAuth', false)
      this.$store.commit('SET_USER', null)
      this.$ls.remove('GC_AUTH_TOKEN')
      this.$ls.remove('GC_AUTH_USER')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
<style lang="scss" scoped>
@media (min-width: 480px) {
  .pag-profile{
    &__body{
      margin-top: -125px;
    }
  }
}
.pag-profile{
  .hero{
    background-position: center center;
  }
  &__body{
    margin-top: -65px;
    text-align: center;
    margin-bottom: 1rem;
  }
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
