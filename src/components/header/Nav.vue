<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <router-link :to="{name: 'Home'}" class="nav-item is-tab" exact active-class="is-active">
          <i class="fa fa-home"></i> &nbsp; Home
        </router-link>
        <a class="nav-item is-tab"><i class="fa fa-bolt"></i> &nbsp; Moments</a>
        <a class="nav-item is-tab"><i class="fa fa-bell-o"></i> &nbsp; Notifications</a>
        <a class="nav-item is-tab"><i class="fa fa-envelope"></i> &nbsp; Messages</a>
      </div>

      <div class="nav-center">
        <a class="nav-item">
          <span class="icon">
            <i class="fa fa-twitter"></i>
          </span>
        </a>
      </div>

      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu">
        <span v-if="user" class="nav-item">
          <router-link :to="{name: 'Auth'}" class="button is-primary" active-class="is-active">
            <span class="icon">
              <i class="fa fa-user"></i>
            </span>
            <span>Profile</span>
          </router-link>
        </span>
        <span v-if="!user" class="nav-item">
          <router-link :to="{name: 'Auth'}" class="button is-primary" active-class="is-active">
            <span class="icon">
              <i class="fa fa-sign-in"></i>
            </span>
            <span>Login</span>
          </router-link>
        </span>
        <span v-else class="nav-item">
          <a class="button" @click="activeTweetForm = true">
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
            <span>Tweet</span>
          </a>
        </span>
        <b-modal :active.sync="activeTweetForm" has-modal-card>
          <modal-post></modal-post>
        </b-modal>
      </div>
    </div>
  </nav>
</template>

<script>
import modalPost from '../ModalPost'
export default {
  components: {
    modalPost
  },
  data () {
    return {
      activeTweetForm: false
    }
  },
  computed: {
    user () {
      return this.$store.state.userAuth
    }
  }
}
</script>
