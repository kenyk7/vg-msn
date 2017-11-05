<template>
  <section class="section main">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <card-profile></card-profile>
          <div class="spacer"></div>
          <div class="box trending">
            <p class="trend-title"><span class="title is-5">Trends</span></p>
            <div v-for="item in posts" class="trend-hashtag" :key="item.id">
              <a href="#">{{item.content}}</a>
              {{item._likedPostsMeta.count}} Likes
            </div>
          </div>
        </div>
        <div class="column is-6">
          <app-quotes></app-quotes>
          <p class="has-text-centered">
            <button v-if="hasMore" class="button is-primary" @click="loadMore()">Ver más</button>
          </p>
        </div>
        <div class="column is-3">
          <div class="box">
            <p><span class="title is-5">Who to follow</span></p>
            <hr>
            <div class="columns" v-for="item in users" :key="item.id">
              <div class="column is-3 is-marginless">
                <div class="image">
                  <img src="https://placeimg.com/250/250/people">
                </div>
              </div>
              <div class="column is-9">
                <p style="margin-top: -6px">
                  <a href="#">
                    <strong>@{{item.username}}</strong> ({{item._followersMeta.count}})
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
import appQuotes from './post/Quotes.vue'
import cardProfile from './partials/CardProfile.vue'
import { mapGetters } from 'vuex'
import { addToUserOnUser, removeFromUserOnUser, updateUserFake } from './post/graph.cool.js'
export default {
  components: {
    postList,
    appQuotes,
    cardProfile
  },
  computed: mapGetters(['user', 'users', 'posts', 'hasMore']),
  mounted () {
    const _self = this
    window.onscroll = function (e) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
        _self.loadMore()
      }
    }
  },
  methods: {
    loadMore () {
      if (!this.hasMore) return
      const keys = Object.keys(this.posts)
      const payload = {
        userAuth: this.user.id,
        after: keys[keys.length - 1]
      }
      console.log('load more')
      this.$store.dispatch('getPosts', payload)
    },
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
        // for update list users
        _self.$apollo.mutate({
          mutation: updateUserFake,
          variables: {
            id: item.id
          }
        })
        // for update profile
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
