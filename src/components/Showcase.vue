<template>
  <div class="showcase-content">
    <section>
      <section class="hero is-milk-jam is-medium">
        <div class="hero-body showcase">
          <div class="container">
            <article class="media showcase">
              <div class="media-left">
                <figure class="image">
                  <div v-if="!!showcase.logo">
                    <div class="logo" v-bind:style="{ backgroundImage: 'url(' + showcase.logo_medium + ')' }" ></div>
                  </div>
                  <div v-else>
                    <div class="logo" v-bind:style="{ backgroundImage: 'url(../assets/images/avatar.png)' }" ></div>
                  </div>
                </figure>
              </div>
              <div class="media-right">
                <h1 class="title menu-title">{{ showcase.name }}</h1>
              </div>
            </article>
          </div>
        </div>
      </section>
      <b-tabs position="is-centered" class="tabs-showcase" v-model="activeTab">
          <b-tab-item label="Présentation">
            <div class="container showcase">
              <div class="showcase-user-infos">
                {{ showcase.showcase_type_lbl }} - {{ showcase.category_lbl }} - {{ showcase.profession }}
              </div>
              <div class="presentation" v-html="showcase.presentation"></div>
            </div>
            <section class="hero is-milk-jam">
              <div class="hero-body">
                <div class="container views-likes">
                  <div class="showcase-views">
                    <span class="icon" style="color: #767676;">
                      <i class="material-icons big" aria-hidden="true">visibility</i> {{ showcase.nb_views }}
                    </span>
                  </div>
                  <div class="showcase-likes">
                    <div class="like-icon">
                      <input type="checkbox" id="likes-checkbox" v-model="likeChecked" v-on:change="likeAction()"/>
                      <label for="likes-checkbox">
                        <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg"><g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)"><path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#767676"/><circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/><g id="grp7" opacity="0" transform="translate(7 6)"><circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/><circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/></g><g id="grp6" opacity="0" transform="translate(0 28)"><circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/><circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/></g><g id="grp3" opacity="0" transform="translate(52 28)"><circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/><circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/></g><g id="grp2" opacity="0" transform="translate(44 6)" fill="#CC8EF5"><circle id="oval2" transform="matrix(-1 0 0 1 10 0)" cx="5" cy="6" r="2"/><circle id="oval1" transform="matrix(-1 0 0 1 4 0)" cx="2" cy="2" r="2"/></g><g id="grp5" opacity="0" transform="translate(14 50)" fill="#91D2FA"><circle id="oval1" transform="matrix(-1 0 0 1 12 0)" cx="6" cy="5" r="2"/><circle id="oval2" transform="matrix(-1 0 0 1 4 0)" cx="2" cy="2" r="2"/></g><g id="grp4" opacity="0" transform="translate(35 50)" fill="#F48EA7"><circle id="oval1" transform="matrix(-1 0 0 1 12 0)" cx="6" cy="5" r="2"/><circle id="oval2" transform="matrix(-1 0 0 1 4 0)" cx="2" cy="2" r="2"/></g><g id="grp1" opacity="0" transform="translate(24)" fill="#9FC7FA"><circle id="oval1" cx="2.5" cy="3" r="2"/><circle id="oval2" cx="7.5" cy="2" r="2"/></g></g></svg>
                      </label>
                    </div>
                    <span class="nb-likes" style="color: #767676;">
                      {{ showcase.nb_likes }}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section class="hero is-tsilaosa showcase-images">
              <div class="grid js-masonry">
                <div class="grid-item" v-model="showcaseImages"
                  v-for="item in showcaseImages"
                  v-bind:item="item"
                  v-bind:key="item.id">
                  <img v-img:my-group="{src: item.thumb_big}" :src="item.url">
                </div>
              </div>
            </section>
          </b-tab-item>
          <b-tab-item label="Produits" v-if='!!products.length > 0'>
            <div class="container showcase">
              <div class="presentation">
                <h2> Et voici mes produits </h2>
              </div>
            </div>
            <br>
            <div class="container">
              <section class="products">
                <router-link class="card showcase"
                  v-model="products"
                  v-for="p in products"
                  v-bind:item="p"
                  v-bind:key="p.id" :to="{ name: 'product', params: { id: p.id } }">
                  <div class="card-image">
                    <figure class="image" v-if="p.images[0]">
                      <div class="slide" v-bind:style="{ backgroundImage: 'url(' + p.images[0].thumb_medium + ')' }" ></div>
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">{{ p.name }}</p>
                        <p class="subtitle is-6">{{ p.price }} €</p>
                      </div>
                    </div>
                    <div class="content">
                      <div v-html="p.short_description"></div>
                    </div>
                  </div>
                  <br>
                </router-link>
              </section>
              <br>
            </div>
          </b-tab-item>
      </b-tabs>
      <section class="hero is-blue-mapbox" v-show="this.showMap">
        <div class="hero-body no-padding">
          <div class="container">
            <div class="columns">
              <div class="column is-three-fifths">
                <div class="lebertel-map" v-if="!!showcase.location">
                  <v-map :padding="[200, 200]" :zoom="zoom" :options="getOptions" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" v-on:l-zoomanim="zoomChanged">
                    <v-tilelayer :url="url"></v-tilelayer>
                    <div v-if="showcase.location != undefined">
                      <v-marker :lat-lng="showcase.location.coordinates" :draggable="false" v-on:l-move="markerMoved">
                        <v-popup :content="showcase.address"></v-popup>
                      </v-marker>
                    </div>
                    <div v-else>
                      <v-marker :lat-lng="marker" :draggable="false" v-on:l-move="markerMoved">
                        <v-popup content="Mon atelier"></v-popup>
                      </v-marker>
                    </div>
                  </v-map>
                </div>
              </div>
              <div class="column is-one-third is-offset-1 showcase-address-info">
                <address class="showcase-address">
                  <h2>{{ showcase.name }}</h2>
                  {{ showcase.address }}<br>
                  {{ showcase.postcode }} {{ showcase.city }}<br>
                  La Réunion <br>
                  <div class="phone">
                    <span class="icon margin-right">
                      <i class="fa fa-phone"></i>
                    </span>
                    {{ showcase.phone_number }}
                  </div>
                  <div class="email">
                    <span class="icon margin-right">
                      <i class="fa fa-envelope-o"></i>
                    </span>
                    {{ showcase.email }}
                  </div>
                </address>
                <br>
                <div class="timetable" v-if='!!showcase.timetable'>
                  <h2>Horaires</h2>
                  <div v-html="showcase.timetable"></div>
                </div>
                <br>
                <div class="moreInfos" v-if='!!showcase.informations'>
                  <h2>Pour info</h2>
                  <div v-html="showcase.informations"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="hero is-light">
          <div class="hero-body">
            <div class="container social">
              <a v-if="showcase.website" class="navbar-item" :href="showcase.website" target="_blank">
                <span class="icon" style="color: #767676;">
                  <i class="material-icons" aria-hidden="true">language</i>
                </span>
              </a>
              <a v-if="showcase.facebook" class="navbar-item" :href="showcase.facebook" target="_blank">
                <span class="icon" style="color: #3b5998;">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </span>
              </a>
              <a v-if="showcase.linkedin" class="navbar-item" :href="showcase.linkedin" target="_blank">
                <span class="icon" style="color: #007bb6;">
                  <i class="fa fa-linkedin" aria-hidden="true"></i>
                </span>
              </a>
              <a v-if="showcase.twitter" class="navbar-item" :href="showcase.twitter" target="_blank">
                <span class="icon" style="color: #55acee;">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </span>
              </a>
              <a v-if="showcase.pinterest" class="navbar-item" :href="showcase.pinterest" target="_blank">
                <span class="icon" style="color: #BD081C;">
                  <i class="fa fa-pinterest" aria-hidden="true"></i>
                </span>
              </a>
              <a v-if="showcase.instagram" class="navbar-item" :href="showcase.instagram" target="_blank">
                <span class="icon" style="color: #e95950;">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </div>
        </section>
    </section>
  </div>
</template>

<script>
import Vuex from 'vuex'
import VueImgInputer from 'vue-img-inputer'
import Masonry from 'masonry-layout'
import store from '@/store'
import L from 'leaflet'

var MobileDetect = require('mobile-detect')
var md = new MobileDetect(navigator.userAgent)

export default {
  components: {
    VueImgInputer
  },
  data () {
    return {
      activeTab: 0,
      likeChecked: false,
      images: null,
      showMap: true,
      formstate: {},
      file: '',
      image: '',
      zoom: 10,
      center: [-21.15, 55.50],
      marker: L.latLng(-20.8821, 55.4507),
      minZoom: 10,
      maxZoom: 40,
      opacity: 0.6,
      // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      url: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGViZXJ0ZWwiLCJhIjoiY2o5ZWlrbWo3MjE3bTMycXFjYXJrbTFjdSJ9.lNxTnbWuChJx4UeArFLsXg',
      options: {
        scrollWheelZoom: false
      }
    }
  },
  created () {
    this.images = this.$store.getters.showcaseImages
    console.log(this.showcase)
    if (!this.$cookie.get('lebertel_showcase_view_' + this.showcase.user)) {
      this.$cookie.set('lebertel_showcase_view_' + this.showcase.user, true, 60)
      this.showcase.nb_views++
      store.commit('SET_SHOWCASE_NB_VIEWS', this.showcase.nb_views)
      const data = {
        'user': this.showcase.user,
        'nb_views': this.showcase.nb_views
      }
      this.updateNbViewsShowcase(data)
    }
    if (this.$cookie.get('lebertel_showcase_like_' + this.showcase.user)) {
      this.likeChecked = true
    }
    var elem = document.querySelector('.grid')
    /* eslint-disable no-new */
    new Masonry(elem, {
      itemSelector: '.grid-item',
      columnWidth: 25,
      percentPosition: true
    })
    window.document.title = this.showcase.name + ' sur lebertel.'
  },
  computed: {
    ...Vuex.mapGetters(['showcase', 'products', 'showcaseImages']),
    getOptions: function () {
      var options
      if (md.mobile()) {
        options = {
          scrollWheelZoom: false,
          dragging: false,
          tap: false
        }
        return options
      } else {
        options = {
          scrollWheelZoom: false,
          dragging: true,
          tap: true
        }
        return options
      }
    }
  },
  watch: {
    activeTab (value) {
      if (value === 0) {
        this.showMap = true
      } else {
        this.showMap = false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getShowcase', to.params.id).then(
      store.dispatch('getProductsByUser', to.params.id).then(res => next())
    )
  },
  methods: {
    ...Vuex.mapActions({
      getShowcase: 'getShowcase',
      getProductsByUser: 'getProductsByUser',
      getImage: 'getImage',
      updateNbViewsShowcase: 'updateNbViewsShowcase',
      updateNbLikesShowcase: 'updateNbLikesShowcase'
    }),

    zoomChanged: function (event) {
      this.zoom = event.target.getZoom()
    },

    likeAction: function (event) {
      if (this.likeChecked) {
        this.$cookie.set('lebertel_showcase_like_' + this.showcase.user, true, { expires: '5Y' })
        this.showcase.nb_likes++
        store.commit('SET_SHOWCASE_NB_LIKES', this.showcase.nb_likes)
      } else {
        this.$cookie.delete('lebertel_showcase_like_' + this.showcase.user)
        this.showcase.nb_likes--
        store.commit('SET_SHOWCASE_NB_LIKES', this.showcase.nb_likes)
      }
      const data = {
        'user': this.showcase.user,
        'nb_likes': this.showcase.nb_likes
      }
      this.updateNbLikesShowcase(data)
    }
  }
}
</script>
