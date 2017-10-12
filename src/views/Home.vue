<template>
  <section class="section main">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <div class="card is-fullwidth">
            <header class="card-header" style="background-image: url(https://picsum.photos/200/300)">
            </header>
            <div class="card-content">
              <a class="card-avatar">
                <img src="https://placeimg.com/140/140/people" class="card-avatar-img">
              </a>

              <div class="card-user">
                <div class="card-user-name">
                  <a href="#">John Smith</a>
                </div>
                <span>
                  <a href="#">@<span>jsmith</span></a>
                </span>
              </div>

              <div class="card-stats">
                <ul class="card-stats-list">
                  <li class="card-stats-item">
                    <a href="#" title="9.840 Tweet">
                      <span class="card-stats-key">Tweets</span>
                      <span class="card-stats-val">1</span>
                    </a>
                  </li>
                  <li class="card-stats-item">
                    <a href="#/following" title="885 Following">
                      <span class="card-stats-key">Following</span>
                      <span class="card-stats-val">0</span>
                    </a>
                  </li>
                  <li class="card-stats-item">
                    <a href="#">
                      <span class="card-stats-key">Followers</span>
                      <span class="card-stats-val">0</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="box trending">
            <p class="trend-title"><span class="title is-5">Trends</span> · <a href="#">change</a></p>
            <p class="trend-hashtag"><a href="#">#hashtag1</a><br>13k statuses</p>
          </div>
        </div>
        <div class="column is-6">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="http://placehold.it/128x128" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small> <small style="float:right;">31m</small>
                    <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                  </p>
                </div>
                <nav class="level">
                  <div class="level-left">
                    <a class="level-item">
                      <span class="icon is-small"><i class="fa fa-reply"></i></span>
                    </a>
                    <a class="level-item">
                      <span class="icon is-small"><i class="fa fa-retweet"></i></span>
                    </a>
                    <a class="level-item">
                      <span class="icon is-small"><i class="fa fa-heart"></i></span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
        <div class="column is-3">
          <div class="box">
            <p><span class="title is-5">Who to follow</span> · <a href="#">Refresh</a> · <a href="#">View All</a></p>
            <hr>
            <div class="columns">
              <div class="column is-3 is-marginless">
                <div class="image">
                  <img src="https://placehold.it/200x200">
                </div>
              </div>
              <div class="column is-9">
                <p style="margin-top: -5px">
                  <a href="#">
                    <strong>John Smith</strong>
                    &commat;jsmith
                  </a>
                </p>
                <a class="button is-primary is-small">
                  <span>
                    + Follow
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import List from './photo/List.vue'

export default {
  components: {
    List
  }
}
</script>
