<template>
  <div>
    <transition-group name="list" tag="div" class="box">
      <article class="media" v-for="item in posts" :key="item.id" v-if="item.publish">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://placeimg.com/140/140/people" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{item.sendBy.username}}</strong>
              <small>@{{item.sendBy.username}}</small>
              <small style="float:right;">
                {{ item.postCreated | moment("from") }}
              </small>
              <br>
              {{item.content}}
            </p>
          </div>
          <nav class="level media-actions">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-comment"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-retweet"></i></span>
              </a>

              <a v-if="item.likedPosts.length > 0" class="level-item" @click="removeLike(item)">
                <b-icon icon="heart" class="is-danger is-small"></b-icon> &nbsp;
                <span v-if="item._likedPostsMeta.count > 0" class="has-text-danger">
                  {{item._likedPostsMeta.count}}
                </span>
              </a>
              <a v-else class="level-item" @click="addLike(item)">
                <b-icon icon="heart" class="is-small"></b-icon> &nbsp;
                <span v-if="item._likedPostsMeta.count > 0" >
                  {{item._likedPostsMeta.count}}
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </transition-group>
  </div>
</template>

<script>
import { addToUserOnPost, removeFromUserOnPost, updatePostFake, deletePost, updatePostActive } from './graph.cool.js'
export default {
  data () {
    return {
      user: this.$ls.get('authUser')
    }
  },
  computed: {
    posts () {
      return this.$store.state.post.posts
    }
  },
  methods: {
    addLike (item) {
      this.likeToggle(item, addToUserOnPost)
    },
    removeLike (item) {
      this.likeToggle(item, removeFromUserOnPost)
    },
    likeToggle (item, mutate) {
      const _self = this
      this.$apollo.mutate({
        mutation: mutate,
        variables: {
          postId: item.id,
          userId: _self.user.id
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
          mutation: updatePostFake,
          variables: {
            id: item.id
          }
        })
      }, 700)
    },
    deletePhoto (id) {
      // Mutation
      this.$apollo.mutate({
        mutation: deletePost,
        variables: {
          id
        }
      }).then((data) => {
        console.log('delete post', data)
      }).catch((error) => {
        console.error(error)
      })
    },
    checkPhoto (item, active) {
      this.$apollo.mutate({
        mutation: updatePostActive,
        variables: {
          id: item.id,
          active
        }
      }).then((data) => {
        console.log('toggle active post', data)
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style  lang="scss">
.media-actions{
  margin-top: -10px;
  margin-bottom: -10px;
  a{
    padding: 5px;
    margin-right: 15px;
  }
}
</style>
