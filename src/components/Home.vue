<template>
  <div class="home">
    <section class="hero is-milk-jam is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Bienvenue sur <span class="lebertel-font"> le bertel. </span>
          </h1>
          <h2 class="subtitle">
            Le site des artisans, commercants, services et associations près de chez vous.
          </h2>
        </div>
      </div>
    </section>
    <section class="section hero is-light">
      <div class="container">
        <div class="list-title">
          <p class="title">
            Les nouveaux arrivés.
          </p>
          <b-pagination
              :total="this.showcasesCount"
              :current.sync="current"
              :order="order"
              :size="size"
              :simple="isSimple"
              :per-page="perPage"
              @change="nextShowcases">
          </b-pagination>
        </div>
        <div class="container">
          <section class="list-element">
            <router-link class="card home showcase"
              v-model="showcases"
              v-for="s in showcases"
              v-if="showShowcase(s)"
              v-bind:item="s"
              v-bind:key="s.user" :to="{ name: 'showcase', params: { id: s.slug_name } }">
              <div class="card-image">
                <figure class="image" v-if="s.logo_medium">
                  <div class="slide" v-bind:style="{ backgroundImage: 'url(' + s.logo_medium + ')' }" ></div>
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">{{ s.name }}</p>
                    <p class="subtitle is-6">{{ s.city }}</p>
                  </div>
                </div>
                <div class="content">
                  {{ s.showcase_type_lbl}} <br> {{ s.category_lbl }} <br> {{ s.profession }}
                </div>
              </div>
              <br>
            </router-link>
          </section>
          <br>
        </div>
      </div>
    </section>
    <section class="hero is-tsilaosa">
      <div class="hero-body">
        <div class="container">
          <div class="list-title">
            <p class="title">
              Les nouveaux produits.
            </p>
            <b-pagination
                :total="this.homeProductsCount"
                :current.sync="currentProduct"
                :order="orderProduct"
                :size="sizeProduct"
                :simple="isSimple"
                :per-page="perPageProduct"
                @change="nextProducts">
            </b-pagination>
          </div>
          <div class="container">
            <!--<transition name="container" mode="out-in">-->
              <section class="products">
                <router-link class="card showcase"
                  v-model="homeProducts"
                  v-for="p in homeProducts"
                  v-if="showProduct(p)"
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
            <!--</transition>-->
            <br>
          </div>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="columns is-multiline is-mobile">
        <div class="lebertel-map">
          <v-map :padding="[200, 200]" :zoom="zoom" :options="getOptions" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" v-on:l-zoomanim="zoomChanged">
            <v-tilelayer :url="url"></v-tilelayer>
            <div v-for="showcase in allShowcases" v-if="showcase.location != undefined">
              <v-marker :lat-lng="showcase.location.coordinates" :draggable="false">
                <v-popup :content="showcase.name"></v-popup>
              </v-marker>
            </div>
          </v-map>
        </div>
      </div>
    </section>
    <section class="hero is-blanc-espagne">
      <div class="hero-body">
        <div class="container social">
          CGV - CGU
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vuex from 'vuex'
import store from '@/store'
import L from 'leaflet'

var MobileDetect = require('mobile-detect')
var md = new MobileDetect(navigator.userAgent)

export default {
  data () {
    return {
      zoom: 10,
      center: [-21.15, 55.50],
      marker: L.latLng(-20.8821, 55.4507),
      minZoom: 10,
      maxZoom: 40,
      opacity: 0.6,
      // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      url: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGViZXJ0ZWwiLCJhIjoiY2o5ZWlrbWo3MjE3bTMycXFjYXJrbTFjdSJ9.lNxTnbWuChJx4UeArFLsXg',
      options: {},
      allowDragging: true,
      current: 1,
      perPage: 4,
      order: '',
      size: '',
      currentProduct: 1,
      perPageProduct: 4,
      orderProduct: '',
      sizeProduct: '',
      isSimple: true,
      show: true
    }
  },
  computed: {
    ...Vuex.mapGetters(['allShowcases', 'showcases', 'showcasesCount', 'homeProducts', 'homeProductsCount']),
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
  methods: {
    ...Vuex.mapActions({
      getAllShowcases: 'getAllShowcases',
      getListShowcases: 'getListShowcases',
      getHomeProducts: 'getHomeProducts'
    }),

    nextShowcases: function (page) {
      this.show = false
      this.getListShowcases(page).then(response => {
        this.show = true
      })
    },

    showShowcase: function (s) {
      return s.name && s.logo
    },

    nextProducts: function (page) {
      this.getHomeProducts(page)
      this.show = false
    },

    showProduct: function (p) {
      this.show = true
      return p.name && p.images.length
    },

    zoomChanged: function (event) {
      this.zoom = event.target.getZoom()
    }
  },
  mounted: function () {
    const page = 1
    store.dispatch('getAllShowcases')
    store.dispatch('getListShowcases', page)
    store.dispatch('getHomeProducts', page)
  }
}
</script>
