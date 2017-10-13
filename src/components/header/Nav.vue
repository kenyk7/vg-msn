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
        <span class="nav-item">
          <router-link :to="{name: 'Auth'}" class="button is-primary" active-class="is-active">
            <span class="icon">
              <i class="fa fa-sign-in"></i>
            </span>
            <span>Login</span>
          </router-link>
        </span>
        <span class="nav-item">
          <a class="button" >
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
            <span>Tweet</span>
          </a>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  components: {
  }
}
</script>
