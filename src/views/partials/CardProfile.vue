<template>
  <div class="card card-profile is-fullwidth">
    <header class="card-header" style="background-image: url(https://picsum.photos/500/200?random)">
    </header>
    <div class="card-content">
      <a class="card-avatar">
        <img src="https://placeimg.com/140/140/people" class="card-avatar-img">
      </a>
      <div class="card-user">
        <div class="card-user-name">
          <a href="#">{{profile.username}}</a>
        </div>
        <span>
          <a href="#">@<span>{{profile.username}}</span></a>
        </span>
      </div>
      <div class="card-stats">
        <ul class="card-stats-list">
          <li class="card-stats-item">
            <a href="#">
              <span class="card-stats-key">Posts</span>
              <span class="card-stats-val">{{profile._postsMeta.count}}</span>
            </a>
          </li>
          <li class="card-stats-item">
            <a href="#">
              <span class="card-stats-key">Siguiendo</span>
              <span class="card-stats-val">{{profile._followingsMeta.count}}</span>
            </a>
          </li>
          <li class="card-stats-item">
            <a href="#">
              <span class="card-stats-key">Seguidores</span>
              <span class="card-stats-val">{{profile._followersMeta.count}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  computed: {
    profile () {
      return this.$store.state.profile
    }
  }
}
</script>
<style scoped lang="scss">
.card-profile{
  overflow: hidden;
  border-radius: 4px;
}
</style>
