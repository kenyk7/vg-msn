<template>
  <section class="section main">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <card-profile></card-profile>
          <div class="spacer"></div>
          <div class="box trending">
            <p class="trend-title"><span class="title is-5">Trends</span></p>
            <p>
              Próximamente
            </p>
          </div>
        </div>
        <div class="column is-6">
          <p v-if="hasNews > 0">
            <button class="button is-primary is-fullwidth" @click="mergeNewPosts()">
              See {{hasNews}} new quotes
            </button>
          </p>
          <app-quotes></app-quotes>
          <p class="has-text-centered">
            <button v-if="hasMore" class="button is-primary" @click="loadMore()">Ver más</button>
          </p>
        </div>
        <div class="column is-3">
          <card-who-follow></card-who-follow>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import postList from './post/List.vue'
import appQuotes from './post/Quotes.vue'
import cardProfile from './partials/CardProfile.vue'
import cardWhoFollow from './partials/WhoFollow.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    postList,
    appQuotes,
    cardProfile,
    cardWhoFollow
  },
  computed: {
    ...mapGetters(['user', 'posts', 'newPosts', 'hasMore']),
    hasNews () {
      return Object.keys(this.newPosts).length
    }
  },
  mounted () {
    const _self = this
    window.onscroll = function (e) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
        _self.loadMore()
      }
    }
  },
  methods: {
    mergeNewPosts () {
      this.$store.commit('MERGE_NEW_POSTS')
    },
    loadMore () {
      if (!this.hasMore) return
      const keys = Object.keys(this.posts)
      const payload = {
        userAuth: this.user.id,
        after: keys[keys.length - 1]
      }
      console.log('load more')
      this.$store.dispatch('getPosts', payload)
    }
  }
}
</script>
