<template>
  <section class="section main">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <card-profile></card-profile>
          <div class="spacer"></div>
          <div class="box trending">
            <p class="trend-title"><span class="title is-5">Trends</span></p>
            <div v-for="item in posts" class="trend-hashtag">
              <a href="#">{{item.content}}</a>
              {{item._likedPostsMeta.count}} Likes
            </div>
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
                <p style="margin-top: -6px">
                  <a href="#">
                    <strong>{{item.username}}</strong>
                    &commat;{{item.username}}
                  </a>
                </p>
                <a v-if="item.followers.length > 0" @click="unFollow(item)"
                  class="button is-danger is-small">
                  <span>
                    - Seguir
                  </span>
                </a>
                <a v-else @click="follow(item)"
                class="button is-primary is-small">
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

import { addToUserOnUser, removeFromUserOnUser, updateUserFake } from './post/graph.cool.js'
export default {
  components: {
    postList,
    cardProfile
  },
  computed: {
    // userAuth
    user () {
      return this.$store.state.userAuth
    },
    users () {
      return this.$store.state.user.users
    },
    posts () {
      return this.$store.state.post.posts
    }
  },
  methods: {
    follow (item) {
      this.toggleFollow(item, addToUserOnUser)
    },
    unFollow (item) {
      this.toggleFollow(item, removeFromUserOnUser)
    },
    toggleFollow (item, mutate) {
      const _self = this
      this.$apollo.mutate({
        mutation: mutate,
        variables: {
          idFrom: _self.user.id,
          idTo: item.id
        }
      }).catch((error) => {
        console.log(error)
        this.$toast.open({
          message: 'Error!',
          type: 'is-danger'
        })
      })
      setTimeout(() => {
        // fake mutate
        _self.$apollo.mutate({
          mutation: updateUserFake,
          variables: {
            id: _self.user.id
          }
        })
      }, 700)
    }
  }
}
</script>
