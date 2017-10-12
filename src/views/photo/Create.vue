<template>
  <div>
    <h2 class="title">Create photo</h2>
    <form>
      <div class="field">
        <p class="control">
          <input class="input" type="file" @change="onFileChange">
        </p>
      </div>
    </form>
    <br>
    <form @submit.prevent="create">
      <div class="field">
        <p class="control">
          <input class="input" type="text" v-model="photo.title" placeholder="Title">
        </p>
      </div>
      <div class="field is-hidden">
        <p class="control">
          <textarea  class="textarea" rows="2" v-model="photo.description" placeholder="Description"></textarea>
        </p>
      </div>
      <div class="field is-hidden">
        <p class="control">
          <input class="input" type="text" v-model="photo.imageUrl" placeholder="Image url">
        </p>
      </div>
      <p class="is-pulled-right">
        <button class="button is-primary" type="submit" :disabled="!photo.fileId">Submit</button>
      </p>
    </form>
  </div>
</template>

<script>
/* global FormData, fetch */

import { createPhoto } from './graph.cool.js'

export default {
  data () {
    return {
      user: this.$ls.get('authUser'),
      photo: {
        title: 'Title photo or tags',
        description: 'Description..',
        fileId: null
      }
    }
  },
  methods: {
    create () {
      if (!this.photo.title && !this.photo.fileId) return
      const title = this.photo.title
      const description = this.photo.description
      const active = false
      const fileId = this.photo.fileId
      // by user
      const sendBy = this.user.id

      // this.photo.description = ''
      this.photo.fileId = ''

      // Mutation
      this.$apollo.mutate({
        mutation: createPhoto,
        variables: {
          title,
          description,
          active,
          fileId,
          sendBy
        }
      }).then((data) => {
        // Result
        this.$toast.open({
          message: 'Send photo',
          type: 'is-success'
        })
      }).catch((error) => {
        // Error
        this.$toast.open({
          message: error.message,
          type: 'is-danger'
        })
      })
    },
    onFileChange (e) {
      var _self = this
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      let data = new FormData()
      data.append('data', files[0])
      // use the file endpoint
      fetch('https://api.graph.cool/file/v1/cj3klhpqw849h0179onm0yfsr', {
        method: 'POST',
        body: data
      }).then(response => {
        return response.json()
      }).then(image => {
        _self.photo.fileId = image.id
      })
    }
  }
}
</script>
