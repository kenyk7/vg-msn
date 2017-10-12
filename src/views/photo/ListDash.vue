<template>
  <div>
    <transition-group name="list" tag="p" class="columns is-multiline is-tablet">
      <div class="column is-one-third" v-for="item in allPhotos" :key="item">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="setUrlImg(item.file.url)" alt="Image">
            </figure>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">
             <b-icon icon="favorite" :class="{'is-danger': item.likedPhotos.length > 0}"></b-icon>
             {{item._likedPhotosMeta.count}}
            </a>
            <a v-if="!item.active" class="card-footer-item" @click="checkPhoto(item, true)">
              <b-icon icon="check"></b-icon>
            </a>
            <a v-else class="card-footer-item" @click="checkPhoto(item, false)">
              <b-icon icon="close"></b-icon>
            </a>
            <a class="card-footer-item" @click="deletePhoto(item.id)">
              <b-icon icon="delete"></b-icon>
            </a>
            </a>
          </footer>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { deletePhoto, updatePhotoActive } from './graph.cool.js'
export default {
  computed: {
    allPhotos () {
      return this.$store.state.photos
    }
  },
  methods: {
    setUrlImg (url) {
      return url.replace('files', 'images') + '/750x1300'
    },
    deletePhoto (id) {
      // Mutation
      this.$apollo.mutate({
        mutation: deletePhoto,
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
        mutation: updatePhotoActive,
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

<style>

</style>
