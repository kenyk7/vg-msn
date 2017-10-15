<template>
  <form @submit.prevent="save()" class="has-text-left">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Tweet</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Content">
          <b-input
            type="textarea"
            v-model="post.content"
            placeholder="Write your content"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cancel</button>
        <button type="submit" class="button is-primary">Save</button>
      </footer>
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag'
const createPost = gql`
  mutation createPost($content: String!, $sendBy: ID!, $postCreated: DateTime!) {
    createPost(content: $content, sendById: $sendBy, postCreated: $postCreated) {
      id
      content
    }
  }
`

export default {
  data () {
    return {
      post: {
        content: null
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.userAuth
    }
  },
  methods: {
    save () {
      if (!this.post.content) return
      // by user
      const content = this.post.content
      const postCreated = new Date()
      const sendBy = this.user.id
      // reset content
      this.post.content = ''
      // Mutation
      this.$apollo.mutate({
        mutation: createPost,
        variables: {
          content,
          postCreated,
          sendBy
        }
      }).then((data) => {
        // Result
        this.$toast.open({
          message: 'Send post',
          type: 'is-success'
        })
      }).catch((error) => {
        // Error
        console.log(error)
        this.$toast.open({
          message: 'Error!',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>

<style scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
