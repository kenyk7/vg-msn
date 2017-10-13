<template>
  <section class="section main">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <card-profile></card-profile>
          <div class="spacer"></div>
          <div class="box trending">
            <p class="trend-title"><span class="title is-5">Trends</span></p>
            <p class="trend-hashtag">
              <a href="#">#hashtag1</a>
              <br>13k statuses
            </p>
          </div>
        </div>
        <div class="column is-6">
          <post-list></post-list>
        </div>
        <div class="column is-3">
          <div class="box">
            <p><span class="title is-5">Who to follow</span></p>
            <hr>
            <div class="columns" v-for="item in users">
              <div class="column is-3 is-marginless">
                <div class="image">
                  <img src="https://placeimg.com/250/250/people">
                </div>
              </div>
              <div class="column is-9">
                <p style="margin-top: -5px">
                  <a href="#">
                    <strong>{{item.username}}</strong>
                    &commat;{{item.username}}
                  </a>
                </p>
                <a class="button is-danger is-small" v-if="item.followers.length > 0">
                  <span>
                    - Seguir
                  </span>
                </a>
                <a v-else class="button is-primary is-small">
                  <span>
                    + Seguir
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import postList from './post/List.vue'
import cardProfile from './partials/CardProfile.vue'

export default {
  components: {
    postList,
    cardProfile
  },
  computed: {
    users () {
      return this.$store.state.users
    },
    posts () {
      return this.$store.state.posts
    },
    profile () {
      return this.$store.state.profile
    }
  }
}
</script>

<style scoped lang="scss">
  .media-actions{
    margin-top: -10px;
    margin-bottom: -10px;
    a{
      padding: 5px;
      margin-right: 10px;
    }
  }
</style>
