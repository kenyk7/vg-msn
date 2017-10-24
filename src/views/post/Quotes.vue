<template>
  <div>
    <transition-group name="list" tag="div" class="box-">
      <article class="quote" v-for="item in posts" :key="item.id" v-if="item.publish">
        <div class="quote__like">
          <a v-if="item.likedPosts.length > 0" @click="removeLike(item)">
            <b-icon icon="heart" class="is-danger"></b-icon>
          </a>
          <a v-else @click="addLike(item)">
            <b-icon icon="heart-o"></b-icon>
          </a>
        </div>
        <div class="quote__header">
          <div class="quote__user">
            <figure class="quote__user-img">
              <img src="https://placeimg.com/140/140/people" alt="Image" width="64">
            </figure>
          </div>
          <div class="quote__user-caption">
            <div class="quote__user-name">
              <strong>@{{item.sendBy.username}}</strong>
            </div>
            <small class="quote__user-date">
              <span>{{ item.postCreated | moment("from") }}</span>
              <span>-</span>
              <span>
                <b-icon icon="heart" class="is-small"></b-icon>
                <span class="is-count" v-if="item._likedPostsMeta.count > 0" >
                  {{item._likedPostsMeta.count}}
                </span>
              </span>
            </small>
          </div>
        </div>
        <div class="quote__body">
          <blockquote>
            <p>
              {{item.content}}
            </p>
            <span>— {{item.sendBy.username}}</span>
          </blockquote>
        </div>
      </article>
    </transition-group>
  </div>
</template>

<script>
import {
  addToUserOnPost,
  removeFromUserOnPost,
  deletePost,
  updatePostActive,
  updatePostFake,
  updateUserFake
} from './graph.cool.js'

export default {
  computed: {
    user () {
      return this.$store.state.userAuth
    },
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
        _self.$apollo.mutate({
          mutation: updateUserFake,
          variables: {
            id: _self.user.id
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

<style lang="scss">
.quote{
  position: relative;
  padding: 15px;
  border-radius: 3px;
  margin-bottom: 20px;
  background: #fff;
  // border-bottom: 1px solid #ccc;
  box-shadow: 0 1px 5px rgba(#000, 0.2);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  &__like{
    font-size: 125%;
    position: absolute;
    right: 15px;
    top: 10px;
    a{
      color: #444;
    }
  }
  &__header{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .is-count{
      position: relative;
      top: 1px;
    }
  }
  &__user{
    &-img{
      display: flex;
      align-items: center;
      img{
        border-radius: 50%;
        // box-shadow: 0 1px 3px rgba(#000, 0.2);
      }
    }
    &-name{
      font-size: 120%;
    }
    &-caption{
      padding: 5px 10px;
      opacity: 0.8;
    }
  }
  &__body{
    overflow: hidden;
    p{
      font-family: 'Sorts Mill Goudy', serif;
      font-size: 150%;
      line-height: 1.3;
      margin-bottom: 10px;
    }
    span{
      margin-left: 5px;
    }
  }
}
</style>
