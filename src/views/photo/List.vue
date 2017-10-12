<template>
  <div>
    <transition-group name="list" tag="p" class="columns is-multiline is-tablet">
      <div class="column is-one-third" v-for="item in allPhotos" :key="item" v-if="item.active">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="setUrlImg(item.file.url)" alt="Image">
            </figure>
          </div>
          <footer class="card-footer">
            <a v-if="item.likedPhotos.length > 0" class="card-footer-item" @click="removePhotoLike(item)">
              <b-icon icon="favorite" class="is-danger"></b-icon>
              {{item._likedPhotosMeta.count}}
            </a>
            <a v-else class="card-footer-item" @click="addPhotoLike(item)">
              <b-icon icon="favorite"></b-icon>
              {{item._likedPhotosMeta.count}}
            </a>
            <a class="card-footer-item">
              <b-dropdown>
                <b-icon icon="share" slot="trigger"></b-icon>
                <b-dropdown-option>Facebook</b-dropdown-option>
                <b-dropdown-option>Twitter</b-dropdown-option>
                <b-dropdown-option>Whatsapp</b-dropdown-option>
              </b-dropdown>
            </a>
          </footer>
          <pre>{{item.sendBy}}</pre>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { addToUserOnPhoto, removeFromUserOnPhoto, updatePhotoFake } from './graph.cool.js'
export default {
  data () {
    return {
      user: this.$ls.get('authUser')
    }
  },
  computed: {
    allPhotos () {
      return this.$store.getters.photos
    }
  },
  methods: {
    setUrlImg (url) {
      return url.replace('files', 'images') + '/750x1300'
    },
    addPhotoLike (item) {
      this.photoLikeToggle(item, addToUserOnPhoto)
    },
    removePhotoLike (item) {
      this.photoLikeToggle(item, removeFromUserOnPhoto)
    },
    photoLikeToggle (item, mutate) {
      const _self = this
      this.$apollo.mutate({
        mutation: mutate,
        variables: {
          photoId: item.id,
          userId: _self.user.id
        }
      }).then((data) => {
        this.$toast.open({
          message: 'Toggle like',
          type: 'is-success'
        })
      }).catch((error) => {
        this.$toast.open({
          message: error.message,
          type: 'is-danger'
        })
      })
      setTimeout(() => {
        // fake mutate
        _self.$apollo.mutate({
          mutation: updatePhotoFake,
          variables: {
            id: item.id
          }
        })
      }, 700)
    }
  }
}
</script>

<style>

</style>
