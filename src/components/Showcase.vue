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
              <div class="presentation" v-html="showcase.presentation"></div>
            </div>
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
      <section class="hero is-blanc-espagne">
          <div class="hero-body">
            <div class="container social">
              <a v-if="showcase.website" class="navbar-item" :href="showcase.website" target="_blank">
                <span class="icon" style="color: #767676;">
                  <i class="material-icons">language</i>
                </span>
              </a>
              <a v-if="showcase.facebook" class="navbar-item" :href="showcase.facebook" target="_blank">
                <span class="icon" style="color: #3b5998;">
                  <i class="fa fa-facebook"></i>
                </span>
              </a>
              <a v-if="showcase.linkedin" class="navbar-item" :href="showcase.linkedin" target="_blank">
                <span class="icon" style="color: #007bb6;">
                  <i class="fa fa-linkedin"></i>
                </span>
              </a>
              <a v-if="showcase.twitter" class="navbar-item" :href="showcase.twitter" target="_blank">
                <span class="icon" style="color: #55acee;">
                  <i class="fa fa-twitter"></i>
                </span>
              </a>
              <a v-if="showcase.pinterest" class="navbar-item" :href="showcase.pinterest" target="_blank">
                <span class="icon" style="color: #BD081C;">
                  <i class="fa fa-pinterest"></i>
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
    var elem = document.querySelector('.grid')
    var msnry = new Masonry(elem, {
      itemSelector: '.grid-item',
      columnWidth: 25,
      percentPosition: true
    })
    console.log(msnry)
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
      getImage: 'getImage'
    }),

    zoomChanged: function (event) {
      this.zoom = event.target.getZoom()
    }
  }
}
</script>
