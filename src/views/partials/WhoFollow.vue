<template>
  <div class="box">
    <p><span class="title is-5">Who to follow</span></p>
    <hr>
    <div class="columns" v-for="item in users" :key="item.id">
      <div class="column is-3 is-marginless">
        <div class="image">
          <img :src="'https://placeimg.com/140/140/animals?' + item.username">
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
</template>
<script>
import { mapGetters } from 'vuex'
import { addToUserOnUser, removeFromUserOnUser, updateUserFake } from '../post/graph.cool.js'

export default{
  computed: mapGetters(['user', 'users']),
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
